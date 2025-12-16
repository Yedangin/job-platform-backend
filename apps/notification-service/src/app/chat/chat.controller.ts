import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';

// Assuming you have a JwtAuthGuard in your common library
// If not, you can create one or use the existing auth guard
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // ============================================================
  // CREATE ONE-TO-ONE CONVERSATION
  // ============================================================
  @Post('conversations/one-to-one')
  // @UseGuards(JwtAuthGuard) // Uncomment when you have the guard
  async createOneToOne(
    @Body() body: { userId1: string; userId2: string }
    // @Request() req: any // Uncomment to get authenticated user
  ) {
    return await this.chatService.createOneToOneConversation(
      body.userId1,
      body.userId2
    );
  }

  // ============================================================
  // CREATE GROUP CONVERSATION
  // ============================================================
  @Post('conversations/group')
  // @UseGuards(JwtAuthGuard)
  async createGroup(
    @Body() body: { name: string; creatorId: string; memberIds: string[] }
    // @Request() req: any
  ) {
    return await this.chatService.createGroupConversation(
      body.name,
      body.creatorId,
      body.memberIds
    );
  }

  // ============================================================
  // GET USER CONVERSATIONS
  // ============================================================
  @Get('conversations/user/:userId')
  // @UseGuards(JwtAuthGuard)
  async getUserConversations(
    @Param('userId') userId: string
    // @Request() req: any
  ) {
    return await this.chatService.getUserConversations(userId);
  }

  // ============================================================
  // GET CONVERSATION DETAILS
  // ============================================================
  @Get('conversations/:conversationId')
  // @UseGuards(JwtAuthGuard)
  async getConversation(
    @Param('conversationId') conversationId: string
    // @Request() req: any
  ) {
    return await this.chatService.getConversation(conversationId);
  }

  // ============================================================
  // ADD MEMBER TO GROUP
  // ============================================================
  @Post('conversations/:conversationId/members')
  // @UseGuards(JwtAuthGuard)
  async addMember(
    @Param('conversationId') conversationId: string,
    @Body() body: { userId: string; addedBy: string }
    // @Request() req: any
  ) {
    return await this.chatService.addMemberToGroup(
      conversationId,
      body.userId,
      body.addedBy
    );
  }

  // ============================================================
  // REMOVE MEMBER FROM GROUP
  // ============================================================
  @Post('conversations/:conversationId/members/remove')
  // @UseGuards(JwtAuthGuard)
  async removeMember(
    @Param('conversationId') conversationId: string,
    @Body() body: { userId: string; removedBy: string }
    // @Request() req: any
  ) {
    return await this.chatService.removeMemberFromGroup(
      conversationId,
      body.userId,
      body.removedBy
    );
  }
}
