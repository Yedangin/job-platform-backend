import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { WsException } from '@nestjs/websockets';

describe('ChatGateway', () => {
  let gateway: ChatGateway;
  let chatService: ChatService;
  let jwtService: JwtService;

  const mockChatService = {
    verifyConversationMember: jest.fn(),
    getConversation: jest.fn(),
    createMessage: jest.fn(),
    markMessageAsSeen: jest.fn(),
  };

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatGateway,
        {
          provide: ChatService,
          useValue: mockChatService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
    chatService = module.get<ChatService>(ChatService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('handleConnection', () => {
    it('should authenticate user with valid token', async () => {
      const mockClient: any = {
        handshake: {
          auth: { token: 'valid-token' },
          headers: {},
        },
        data: {},
        emit: jest.fn(),
        disconnect: jest.fn(),
      };

      const mockPayload = {
        sub: 'user-123',
        email: 'test@example.com',
        roles: ['user'],
      };

      mockJwtService.verifyAsync.mockResolvedValue(mockPayload);

      await gateway.handleConnection(mockClient);

      expect(mockClient.data.user).toEqual({
        userId: 'user-123',
        email: 'test@example.com',
        roles: ['user'],
      });
      expect(mockClient.emit).toHaveBeenCalledWith('connected', {
        userId: 'user-123',
        message: 'Successfully connected to chat',
      });
    });

    it('should disconnect client with invalid token', async () => {
      const mockClient: any = {
        handshake: {
          auth: { token: 'invalid-token' },
          headers: {},
        },
        data: {},
        emit: jest.fn(),
        disconnect: jest.fn(),
      };

      mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));

      await gateway.handleConnection(mockClient);

      expect(mockClient.emit).toHaveBeenCalledWith('error', {
        message: 'Invalid or expired token',
      });
      expect(mockClient.disconnect).toHaveBeenCalled();
    });

    it('should disconnect client without token', async () => {
      const mockClient: any = {
        handshake: {
          auth: {},
          headers: {},
        },
        data: {},
        emit: jest.fn(),
        disconnect: jest.fn(),
      };

      await gateway.handleConnection(mockClient);

      expect(mockClient.emit).toHaveBeenCalledWith('error', {
        message: 'Authentication required',
      });
      expect(mockClient.disconnect).toHaveBeenCalled();
    });
  });

  describe('handleJoinConversation', () => {
    it('should allow member to join conversation', async () => {
      const mockClient: any = {
        data: {
          user: { userId: 'user-123', email: 'test@example.com' },
        },
        join: jest.fn(),
        emit: jest.fn(),
        to: jest.fn().mockReturnThis(),
      };

      const mockConversation = {
        id: 'conv-123',
        name: 'Test Chat',
        isGroup: false,
      };

      mockChatService.verifyConversationMember.mockResolvedValue(true);
      mockChatService.getConversation.mockResolvedValue(mockConversation);

      await gateway.handleJoinConversation(
        { conversationId: 'conv-123' },
        mockClient
      );

      expect(mockClient.join).toHaveBeenCalledWith('conversation_conv-123');
      expect(mockClient.emit).toHaveBeenCalledWith('joined-conversation', {
        conversationId: 'conv-123',
        conversation: mockConversation,
      });
    });

    it('should reject non-member from joining', async () => {
      const mockClient: any = {
        data: {
          user: { userId: 'user-123', email: 'test@example.com' },
        },
        join: jest.fn(),
        emit: jest.fn(),
      };

      mockChatService.verifyConversationMember.mockResolvedValue(false);

      await gateway.handleJoinConversation(
        { conversationId: 'conv-123' },
        mockClient
      );

      expect(mockClient.join).not.toHaveBeenCalled();
      expect(mockClient.emit).toHaveBeenCalledWith('error', {
        message: 'You are not a member of this conversation',
      });
    });
  });

  describe('handleSendMessage', () => {
    it('should send message to conversation members', async () => {
      const mockClient: any = {
        data: {
          user: { userId: 'user-123', email: 'test@example.com' },
        },
        emit: jest.fn(),
      };

      const mockMessage = {
        id: 'msg-123',
        conversationId: 'conv-123',
        senderId: 'user-123',
        message: 'Hello!',
        createdAt: new Date(),
      };

      mockChatService.verifyConversationMember.mockResolvedValue(true);
      mockChatService.createMessage.mockResolvedValue(mockMessage);

      // Mock server.to().emit()
      const mockTo = jest.fn().mockReturnValue({
        emit: jest.fn(),
      });
      gateway.server = { to: mockTo } as any;

      await gateway.handleSendMessage(
        { conversationId: 'conv-123', message: 'Hello!' },
        mockClient
      );

      expect(mockChatService.createMessage).toHaveBeenCalledWith({
        conversationId: 'conv-123',
        senderId: 'user-123',
        message: 'Hello!',
      });
      expect(mockTo).toHaveBeenCalledWith('conversation_conv-123');
    });
  });
});
