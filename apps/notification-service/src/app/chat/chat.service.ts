import { NotificationPrismaService } from '@in-job/common';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: NotificationPrismaService) {}

  // ============================================================
  // VERIFY CONVERSATION MEMBERSHIP
  // ============================================================
  async verifyConversationMember(
    conversationId: string,
    userId: string
  ): Promise<boolean> {
    const member = await this.prisma.conversationMember.findUnique({
      where: {
        conversationId_userId: {
          conversationId,
          userId,
        },
      },
    });

    return !!member;
  }

  // ============================================================
  // GET CONVERSATION DETAILS
  // ============================================================
  async getConversation(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        members: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 50, // Last 50 messages
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  // ============================================================
  // CREATE MESSAGE
  // ============================================================
  async createMessage(data: {
    conversationId: string;
    senderId: string;
    message: string;
  }) {
    return await this.prisma.message.create({
      data: {
        conversationId: data.conversationId,
        senderId: data.senderId,
        message: data.message,
        isSeen: false,
      },
    });
  }

  // ============================================================
  // MARK MESSAGE AS SEEN
  // ============================================================
  async markMessageAsSeen(messageId: string) {
    return await this.prisma.message.update({
      where: { id: messageId },
      data: { isSeen: true },
    });
  }

  async createOrVerifyConversation(userId1: string, userId2: string) {
    try {
      console.log('createOrVerifyConversation called with:', {
        userId1,
        userId2,
      });

      // Validate inputs
      if (!userId1 || !userId2) {
        throw new Error('Both userId1 and userId2 are required');
      }

      // Check if conversation already exists between these two users
      const existingConversations = await this.prisma.conversation.findMany({
        where: {
          isGroup: false,
          members: {
            some: {
              userId: {
                in: [userId1, userId2],
              },
            },
          },
        },
        include: {
          members: true,
        },
      });

      console.log(
        'Found existing conversations:',
        existingConversations.length
      );

      // Find a conversation where both users are members
      const existingConversation = existingConversations.find((conv) => {
        const memberIds = conv.members.map((m) => m.userId);
        return (
          conv.members.length === 2 &&
          memberIds.includes(userId1) &&
          memberIds.includes(userId2)
        );
      });

      if (existingConversation) {
        console.log(
          'Returning existing conversation:',
          existingConversation.id
        );
        return existingConversation;
      }

      console.log('Creating new conversation...');
      // Create new conversation
      const newConversation = await this.prisma.conversation.create({
        data: {
          isGroup: false,
          members: {
            create: [{ userId: userId1 }, { userId: userId2 }],
          },
        },
        include: {
          members: true,
        },
      });

      console.log('Created new conversation:', newConversation.id);
      return newConversation;
    } catch (error) {
      console.error('Error in createOrVerifyConversation:', error);
      throw error;
    }
  }

  // ============================================================
  // CREATE ONE-TO-ONE CONVERSATION
  // ============================================================
  async createOneToOneConversation(userId1: string, userId2: string) {
    // Check if conversation already exists between these two users
    const existingConversation = await this.prisma.conversation.findFirst({
      where: {
        isGroup: false,
        members: {
          every: {
            userId: {
              in: [userId1, userId2],
            },
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (existingConversation && existingConversation.members.length === 2) {
      return existingConversation;
    }

    // Create new conversation
    return await this.prisma.conversation.create({
      data: {
        isGroup: false,
        members: {
          create: [{ userId: userId1 }, { userId: userId2 }],
        },
      },
      include: {
        members: true,
      },
    });
  }

  // ============================================================
  // CREATE GROUP CONVERSATION
  // ============================================================
  async createGroupConversation(
    name: string,
    creatorId: string,
    memberIds: string[]
  ) {
    return await this.prisma.conversation.create({
      data: {
        name,
        isGroup: true,
        members: {
          create: [
            { userId: creatorId, isAdmin: true }, // Creator is admin
            ...memberIds.map((userId) => ({ userId, isAdmin: false })),
          ],
        },
      },
      include: {
        members: true,
      },
    });
  }

  // ============================================================
  // GET USER CONVERSATIONS
  // ============================================================
  async getUserConversations(userId: string) {
    return await this.prisma.conversation.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: true,
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Last message only
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ============================================================
  // ADD MEMBER TO GROUP
  // ============================================================
  async addMemberToGroup(
    conversationId: string,
    userId: string,
    addedBy: string
  ) {
    // Verify the person adding is an admin
    const admin = await this.prisma.conversationMember.findUnique({
      where: {
        conversationId_userId: {
          conversationId,
          userId: addedBy,
        },
      },
    });

    if (!admin || !admin.isAdmin) {
      throw new Error('Only admins can add members');
    }

    // Verify it's a group conversation
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation?.isGroup) {
      throw new Error('Can only add members to group conversations');
    }

    return await this.prisma.conversationMember.create({
      data: {
        conversationId,
        userId,
        isAdmin: false,
      },
    });
  }

  // ============================================================
  // REMOVE MEMBER FROM GROUP
  // ============================================================
  async removeMemberFromGroup(
    conversationId: string,
    userId: string,
    removedBy: string
  ) {
    // Verify the person removing is an admin
    const admin = await this.prisma.conversationMember.findUnique({
      where: {
        conversationId_userId: {
          conversationId,
          userId: removedBy,
        },
      },
    });

    if (!admin || !admin.isAdmin) {
      throw new Error('Only admins can remove members');
    }

    return await this.prisma.conversationMember.delete({
      where: {
        conversationId_userId: {
          conversationId,
          userId,
        },
      },
    });
  }
}
