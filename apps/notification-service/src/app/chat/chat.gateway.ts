import { UseGuards, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard, RedisService } from '@in-job/common';
import { ChatService } from './chat.service';
import * as cookie from 'cookie';

interface AuthenticatedSocket extends Socket {
  data: {
    user: {
      userId: string;
      email: string;
      role?: string;
    };
  };
}

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private connectedUsers: Map<string, string> = new Map(); // userId -> socketId

  constructor(
    private readonly chatService: ChatService,
    private readonly redisService: RedisService
  ) {
    // super();
  }

  // ============================================================
  // CONNECTION HANDLING WITH SESSION COOKIE AUTHENTICATION
  // ============================================================
  async handleConnection(client: AuthenticatedSocket) {
    this.logger.log('Client connected is working on chat gateway');
    try {
      // Extract sessionId from cookies
      const rawCookie = client.handshake.headers.cookie;

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

      // Get session data from Redis
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
      const sessionData = JSON.parse(sessionDataStr);

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

  handleDisconnect(client: AuthenticatedSocket) {
    const user = client.data?.user;
    if (user) {
      this.connectedUsers.delete(user.userId);
      this.logger.log(`User ${user.userId} disconnected`);
    }
  }

  // ============================================================
  // JOIN CONVERSATION (ONE-TO-ONE OR GROUP)
  // ============================================================
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('join-conversation')
  async handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket
  ) {
    this.logger.log('message received', data);
    this.logger.log('handleJoinConversation called');
    try {
      const user = client.data.user;

      // Verify user is a member of this conversation
      const isMember = await this.chatService.verifyConversationMember(
        data.conversationId,
        user.userId
      );

      if (!isMember) {
        throw new WsException('You are not a member of this conversation');
      }

      const room = `conversation_${data.conversationId}`;
      await client.join(room);

      this.logger.log(
        `User ${user.userId} joined conversation ${data.conversationId}`
      );

      // Get conversation details
      const conversation = await this.chatService.getConversation(
        data.conversationId
      );

      // Notify user they joined
      client.emit('joined-conversation', {
        conversationId: data.conversationId,
        conversation,
      });

      // Notify other members in the room
      client.to(room).emit('user-joined', {
        conversationId: data.conversationId,
        userId: user.userId,
        email: user.email,
      });
    } catch (error) {
      this.logger.error('Error joining conversation:', error.message);
      client.emit('error', { message: error.message });
    }
  }

  // ============================================================
  // LEAVE CONVERSATION
  // ============================================================
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('leave-conversation')
  async handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket
  ) {
    this.logger.log('message received', data);
    this.logger.log('handleLeaveConversation called');
    try {
      const user = client.data.user;
      const room = `conversation_${data.conversationId}`;

      await client.leave(room);

      this.logger.log(
        `User ${user.userId} left conversation ${data.conversationId}`
      );

      client.emit('left-conversation', { conversationId: data.conversationId });

      // Notify other members
      client.to(room).emit('user-left', {
        conversationId: data.conversationId,
        userId: user.userId,
      });
    } catch (error) {
      this.logger.error('Error leaving conversation:', error.message);
      client.emit('error', { message: error.message });
    }
  }

  // ============================================================
  // SEND MESSAGE (ONE-TO-ONE OR GROUP)
  // ============================================================
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('send-message')
  async handleSendMessage(
    @MessageBody()
    data: {
      conversationId: string;
      message: string;
    },
    @ConnectedSocket() client: AuthenticatedSocket
  ) {
    this.logger.log('message received', data);
    this.logger.log('handleSendMessage called');
    try {
      const user = client.data.user;

      // Verify user is a member of this conversation
      const isMember = await this.chatService.verifyConversationMember(
        data.conversationId,
        user.userId
      );

      if (!isMember) {
        throw new WsException('You are not a member of this conversation');
      }

      // Save message to database
      const savedMessage = await this.chatService.createMessage({
        conversationId: data.conversationId,
        senderId: user.userId,
        message: data.message,
      });

      const room = `conversation_${data.conversationId}`;

      // Broadcast message to all members in the conversation
      this.server.to(room).emit('new-message', {
        id: savedMessage.id,
        conversationId: data.conversationId,
        message: data.message,
        senderId: user.userId,
        senderEmail: user.email,
        createdAt: savedMessage.createdAt,
      });

      this.logger.log(
        `Message sent by ${user.userId} in conversation ${data.conversationId}`
      );
    } catch (error) {
      this.logger.error('Error sending message:', error.message);
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('test')
  handleTestingMessage(client: Socket, message: any): void {
    this.logger.log('Test message received:', message);
    this.server.emit('test-response', { message: 'Test message received' });
  }

  // ============================================================
  // TYPING INDICATOR
  // ============================================================
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('typing')
  async handleTyping(
    @MessageBody() data: { conversationId: string; isTyping: boolean },
    @ConnectedSocket() client: AuthenticatedSocket
  ) {
    try {
      this.logger.log('message received', data);
      this.logger.log('handleTyping called');
      const user = client.data.user;
      const room = `conversation_${data.conversationId}`;

      // Broadcast typing status to other members (not to sender)
      client.to(room).emit('user-typing', {
        conversationId: data.conversationId,
        userId: user.userId,
        isTyping: data.isTyping,
      });
    } catch (error) {
      this.logger.error('Error handling typing:', error.message);
    }
  }

  // ============================================================
  // MARK MESSAGE AS SEEN
  // ============================================================
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('mark-seen')
  async handleMarkSeen(
    @MessageBody() data: { messageId: string; conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket
  ) {
    this.logger.log('message received', data);
    this.logger.log('handleMarkSeen called');
    try {
      const user = client.data.user;

      await this.chatService.markMessageAsSeen(data.messageId);

      const room = `conversation_${data.conversationId}`;

      // Notify other members that message was seen
      client.to(room).emit('message-seen', {
        messageId: data.messageId,
        conversationId: data.conversationId,
        seenBy: user.userId,
      });
    } catch (error) {
      this.logger.error('Error marking message as seen:', error.message);
      client.emit('error', { message: error.message });
    }
  }

  // ============================================================
  // GET ONLINE USERS IN CONVERSATION
  // ============================================================
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('get-online-users')
  async handleGetOnlineUsers(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket
  ) {
    this.logger.log('message received', data);
    this.logger.log('handleGetOnlineUsers called');
    try {
      const room = `conversation_${data.conversationId}`;
      const sockets = await this.server.in(room).fetchSockets();

      const onlineUsers = sockets.map((socket: any) => ({
        userId: socket.data.user?.userId,
        email: socket.data.user?.email,
      }));

      client.emit('online-users', {
        conversationId: data.conversationId,
        users: onlineUsers,
      });
    } catch (error) {
      this.logger.error('Error getting online users:', error.message);
      client.emit('error', { message: error.message });
    }
  }
}
