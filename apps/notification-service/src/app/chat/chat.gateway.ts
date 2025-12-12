import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as cookie from 'cookie';
import { ChatService } from './chat.service';
import { RedisService, SessionData, WsAuthGuard } from '@in-job/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers: Map<string, string> = new Map(); // mapping userId with socketId

  constructor(
    private readonly chatService: ChatService,
    private readonly redisService: RedisService
  ) {
    // super();
  }

  async handleConnection(client: Socket) {
    try {
      const rawCookie = client.handshake.headers?.cookie;

      if (!rawCookie) {
        this.logger.warn('Connection rejected: No cookies provided');
        client.emit('error', { message: 'Authentication required' });
        client.disconnect();
        return;
      }

      const cookies = cookie.parse(rawCookie);
      const sessionId = cookies['sessionId'];

      if (!sessionId) {
        this.logger.warn('Connection rejected: No sessionId cookie');
        client.emit('error', { message: 'Authentication required' });
        client.disconnect();
        return;
      }

      const sessionDataStr = await this.redisService.get(
        `session:${sessionId}`
      );

      if (!sessionDataStr) {
        this.logger.warn('Connection rejected: Invalid or expired session');
        client.emit('error', { message: 'Invalid or expired session' });
        client.disconnect();
        return;
      }

      // Parse session data
      const sessionData = JSON.parse(sessionDataStr) as SessionData;

      // Attach user data to socket
      client.data.user = {
        userId: sessionData.userId,
        email: sessionData.email,
        role: sessionData.role,
      };

      // Track connected user
      this.connectedUsers.set(client.data.user.userId, client.id);

      this.logger.log(
        `User ${client.data.user.userId} (${client.data.user.email}) connected`
      );

      // Notify user of successful connection
      client.emit('connected', {
        userId: client.data.user.userId,
        email: client.data.user.email,
        message: 'Successfully connected to chat',
      });
    } catch (error) {
      this.logger.error('Authentication failed:', error.message);
      client.emit('error', { message: 'Authentication failed' });
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    const user = client.data?.user;
    if (user) {
      this.connectedUsers.delete(user.userId);
      this.logger.log(`User ${user.userId} disconnected`);
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('join-conservation')
  async handleJoinConversaton(
    @MessageBody() data: { recipientId: string },
    @ConnectedSocket() client: Socket
  ) {
    this.logger.log('the data : ', data);
    this.logger.log('the data recipientId: ', data?.recipientId);
    try {
      const user = client.data.user;

      // Validate recipientId
      if (!data.recipientId) {
        client.emit('error', { message: 'recipientId is required' });
        return;
      }

      const conversation = await this.chatService.createOrVerifyConversation(
        user.userId,
        data.recipientId
      );

      // Both users join the conversation room
      const room = `conversation_${conversation.id}`;
      await client.join(room);

      // Get conversation with messages
      const conversationWithMessages = await this.chatService.getConversation(
        conversation.id
      );

      client.emit('conversation-started', {
        conversation: conversationWithMessages,
        recipientId: data.recipientId,
      });

      if (this.connectedUsers && this.connectedUsers.has(data.recipientId)) {
        const recipientSocketId = this.connectedUsers.get(data?.recipientId);
        if (recipientSocketId && this.server) {
          try {
            const allSockets = await this.server.fetchSockets();
            const recipientSocket = allSockets.find(
              (s) => s.id === recipientSocketId
            );
            if (recipientSocket) {
              await recipientSocket.join(room);
              recipientSocket.emit('conversation-started', {
                conversation: conversationWithMessages,
                recipientId: user.userId,
              });
              this.logger.log(`Notified recipient ${data.recipientId}`);
            }
          } catch (err) {
            this.logger.warn(`Could not notify recipient: ${err.message}`);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error starting direct chat:', error.message);
      client.emit('error', { message: error.message });
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody()
    data: { conversationId: string; message: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const user = client.data.user;

      // Validate message data
      if (!data.conversationId || !data.message) {
        client.emit('error', {
          message: 'conversationId and content are required',
        });
        return;
      }

      const message = await this.chatService.createMessage({
        conversationId: data.conversationId,
        senderId: user.userId,
        message: data.message,
      });

      // Emit the new message to all participants in the conversation room
      const room = `conversation_${data.conversationId}`;
      this.server.to(room).emit('new-message', { message });

      this.logger.log(
        `User ${user.userId} sent message to conversation ${data.conversationId}`
      );
    } catch (error) {
      this.logger.error('Error sending message:', error.message);
      client.emit('error', { message: error.message });
    }
  }
}
