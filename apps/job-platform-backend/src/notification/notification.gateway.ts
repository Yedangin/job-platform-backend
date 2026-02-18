import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RedisService, RedisPubSubService } from 'libs/common/src';
import {
  NOTIFICATION_PACKAGE_NAME,
  NotificationServiceClient,
  NOTIFICATION_SERVICE_NAME,
} from 'types/notification/notification';

@WebSocketGateway({
  namespace: '/notifications',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class NotificationGateway
  implements
    OnModuleInit,
    OnModuleDestroy,
    OnGatewayConnection,
    OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private userSockets = new Map<string, Socket[]>();
  private notificationService: NotificationServiceClient;

  constructor(
    private readonly redisService: RedisService,
    private readonly redisPubSub: RedisPubSubService,
    @Inject(NOTIFICATION_PACKAGE_NAME) private client: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.notificationService =
      this.client.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );

    // Subscribe to all notification channels via Redis pattern
    await this.redisPubSub.psubscribe(
      'notification:*',
      (message: string, channel: string) => {
        const userId = channel.replace('notification:', '');
        this.pushToUser(userId, message);
      },
    );

    this.logger.log('WebSocket Notification Gateway initialized');
  }

  async onModuleDestroy() {
    this.userSockets.clear();
  }

  async handleConnection(client: Socket) {
    try {
      const sessionId = this.extractSessionId(client);

      if (!sessionId) {
        this.logger.warn(`Connection rejected: no session`);
        client.disconnect();
        return;
      }

      const sessionData = await this.redisService.get(`session:${sessionId}`);

      if (!sessionData) {
        this.logger.warn(`Connection rejected: invalid session`);
        client.disconnect();
        return;
      }

      const session = JSON.parse(sessionData);
      const userId = session.userId;

      // Store socket mapping
      client.data.userId = userId;
      const sockets = this.userSockets.get(userId) || [];
      sockets.push(client);
      this.userSockets.set(userId, sockets);

      // Join user-specific room
      client.join(`user:${userId}`);

      this.logger.log(`User ${userId} connected (socket: ${client.id})`);

      // Send unread count on connect
      try {
        const unread = await firstValueFrom(
          this.notificationService.getUnreadCount({ userId }),
        );
        client.emit('unread-count', unread);
      } catch (error) {
        this.logger.error('Failed to fetch unread count on connect', error);
      }
    } catch (error) {
      this.logger.error('Connection error', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      const sockets = this.userSockets.get(userId) || [];
      const filtered = sockets.filter((s) => s.id !== client.id);
      if (filtered.length > 0) {
        this.userSockets.set(userId, filtered);
      } else {
        this.userSockets.delete(userId);
      }
      this.logger.log(`User ${userId} disconnected (socket: ${client.id})`);
    }
  }

  @SubscribeMessage('mark-as-read')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    data: { notificationId: string },
  ) {
    const userId = client.data.userId;
    if (!userId) return;

    try {
      const result = await firstValueFrom(
        this.notificationService.markAsRead({
          notificationId: data.notificationId,
          userId,
        }),
      );
      client.emit('notification-read', result);

      // Update unread count
      const unread = await firstValueFrom(
        this.notificationService.getUnreadCount({ userId }),
      );
      this.server.to(`user:${userId}`).emit('unread-count', unread);
    } catch (error) {
      client.emit('error', { message: 'Failed to mark as read' });
    }
  }

  @SubscribeMessage('mark-all-read')
  async handleMarkAllRead(@ConnectedSocket() client: Socket) {
    const userId = client.data.userId;
    if (!userId) return;

    try {
      await firstValueFrom(this.notificationService.markAllAsRead({ userId }));

      this.server.to(`user:${userId}`).emit('unread-count', { count: 0 });
    } catch (error) {
      client.emit('error', { message: 'Failed to mark all as read' });
    }
  }

  private pushToUser(userId: string, message: string) {
    try {
      const notification = JSON.parse(message);
      this.server.to(`user:${userId}`).emit('new-notification', notification);
      this.logger.log(`Pushed notification to user ${userId}`);
    } catch (error) {
      this.logger.error(`Failed to push notification to user ${userId}`, error);
    }
  }

  private extractSessionId(client: Socket): string | null {
    // Try cookie first
    const cookieHeader = client.handshake.headers.cookie;
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );
      if (cookies.sessionId) {
        return cookies.sessionId;
      }
    }

    // Try auth query param
    const sessionId = client.handshake.auth?.sessionId;
    if (sessionId) {
      return sessionId;
    }

    // Try authorization header
    const authHeader = client.handshake.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return null;
  }
}
