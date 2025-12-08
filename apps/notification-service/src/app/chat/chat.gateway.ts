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
import { WsAuthGuard } from '@in-job/common';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';

interface AuthenticatedSocket extends Socket {
  data: {
    user: {
      userId: string;
      email: string;
      roles?: string[];
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
    private readonly jwtService: JwtService
  ) {}

  // ============================================================
  // CONNECTION HANDLING WITH JWT AUTHENTICATION
  // ============================================================
  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Extract token from query params or auth header
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        this.logger.warn('Connection rejected: No token provided');
        client.emit('error', { message: 'Authentication required' });
        client.disconnect();
        return;
      }

      // Verify JWT token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Attach user data to socket
      client.data.user = {
        userId: payload.sub || payload.userId,
        email: payload.email,
        roles: payload.roles,
      };

      // Track connected user
      this.connectedUsers.set(client.data.user.userId, client.id);

      this.logger.log(
        `User ${client.data.user.userId} (${client.data.user.email}) connected`
      );

      // Notify user of successful connection
      client.emit('connected', {
        userId: client.data.user.userId,
        message: 'Successfully connected to chat',
      });
    } catch (error) {
      this.logger.error('Authentication failed:', error.message);
      client.emit('error', { message: 'Invalid or expired token' });
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
