import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Post,
  Query,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  NOTIFICATION_PACKAGE_NAME,
  NotificationServiceClient,
  NOTIFICATION_SERVICE_NAME,
  NotificationChannel,
  NotificationType,
} from 'types/notification/notification';
import {
  SessionAuthGuard,
  CurrentSession,
  grpcToHttpStatus,
} from 'libs/common/src';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(SessionAuthGuard)
export class NotificationController implements OnModuleInit {
  private notificationService: NotificationServiceClient;

  constructor(@Inject(NOTIFICATION_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.notificationService =
      this.client.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

  @Get()
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved.' })
  async getNotifications(
    @CurrentSession() session: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('notificationType') notificationType?: string,
  ) {
    try {
      return await firstValueFrom(
        this.notificationService.getNotifications({
          userId: session.userId,
          basicQuery: {
            page: page || '1',
            limit: limit || '10',
          },
          notificationType: notificationType as any,
        }),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to fetch notifications',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('send')
  @ApiOperation({ summary: 'Send a targeted notification to a user' })
  @ApiResponse({ status: 200, description: 'Notification sent.' })
  async sendTargeted(
    @CurrentSession() session: any,
    @Body()
    body: {
      targetUserId: string;
      targetEmail?: string;
      title: string;
      message: string;
      notificationType?: string;
      channel?: string;
      metadata?: string;
    },
  ) {
    if (!body.targetUserId?.trim()) {
      throw new HttpException(
        'targetUserId is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const typeKey = String(
        body.notificationType || 'STATUS_ALERT',
      ).toUpperCase();
      const channelKey = String(body.channel || 'BOTH').toUpperCase();

      const notificationType =
        (NotificationType as any)[typeKey] ?? NotificationType.STATUS_ALERT;
      const channel =
        (NotificationChannel as any)[channelKey] ?? NotificationChannel.BOTH;

      return await firstValueFrom(
        this.notificationService.sendNotification({
          userId: body.targetUserId.trim(),
          email: body.targetEmail || undefined,
          subject: body.title,
          content: body.message,
          notificationType,
          channel,
          metadata: body.metadata,
        }),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to send notification',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('broadcast')
  @ApiOperation({ summary: 'Broadcast notification to multiple users (admin)' })
  @ApiResponse({ status: 200, description: 'Broadcast sent.' })
  async broadcast(
    @CurrentSession() session: any,
    @Body()
    body: {
      title: string;
      message: string;
      notificationType?: string;
      channel?: string;
      targetUserIds?: string[];
      metadata?: string;
    },
  ) {
    // Admin role check (4 = ADMIN, 5 = SUPERADMIN)
    const role = session.role;
    const isAdmin =
      role === 'ADMIN' ||
      role === 'SUPERADMIN' ||
      role === 4 ||
      role === 5;
    if (!isAdmin) {
      throw new HttpException('Forbidden: Admin only', HttpStatus.FORBIDDEN);
    }

    try {
      const typeKey = String(
        body.notificationType || 'STATUS_ALERT',
      ).toUpperCase();
      const channelKey = String(body.channel || 'PUSH').toUpperCase();

      const notificationType =
        (NotificationType as any)[typeKey] ?? NotificationType.STATUS_ALERT;
      const channel =
        (NotificationChannel as any)[channelKey] ?? NotificationChannel.PUSH;

      let userIds = body.targetUserIds || [];

      // If no specific targets, get all known userIds
      if (userIds.length === 0) {
        const allUsers = await firstValueFrom(
          this.notificationService.getAllUserIds({}),
        );
        userIds = allUsers.userIds || [];
      }

      if (userIds.length === 0) {
        return { success: false, sent: 0, failed: 0, message: 'No users found' };
      }

      return await firstValueFrom(
        this.notificationService.broadcastNotification({
          userIds,
          subject: body.title,
          content: body.message,
          notificationType,
          channel,
          metadata: body.metadata,
        }),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to broadcast notification',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('users')
  @ApiOperation({ summary: 'Get all known user IDs' })
  @ApiResponse({ status: 200, description: 'User IDs retrieved.' })
  async getAllUserIds() {
    try {
      return await firstValueFrom(
        this.notificationService.getAllUserIds({}),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to get user IDs',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('test')
  @ApiOperation({ summary: 'Send a test notification (dev only)' })
  @ApiResponse({ status: 200, description: 'Test notification sent.' })
  async sendTest(
    @CurrentSession() session: any,
    @Body()
    body: {
      title?: string;
      message?: string;
      notificationType?: keyof typeof NotificationType | string;
      channel?: keyof typeof NotificationChannel | string;
      targetUserId?: string;
      targetEmail?: string;
    },
  ) {
    try {
      const typeKey = String(body.notificationType || 'STATUS_ALERT').toUpperCase();
      const channelKey = String(body.channel || 'BOTH').toUpperCase();

      const notificationType =
        (NotificationType as any)[typeKey] ?? NotificationType.STATUS_ALERT;
      const channel = (NotificationChannel as any)[channelKey] ?? NotificationChannel.BOTH;

      return await firstValueFrom(
        this.notificationService.sendNotification({
          userId: body.targetUserId || session.userId,
          email: body.targetEmail || session.email,
          subject: body.title || 'Test Notification',
          content: body.message || 'This is a test notification from /notifications/test.',
          notificationType,
          channel,
        }),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to send test notification',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read.' })
  async markAsRead(@CurrentSession() session: any, @Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.notificationService.markAsRead({
          notificationId: id,
          userId: session.userId,
        }),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to mark notification as read',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({
    status: 200,
    description: 'All notifications marked as read.',
  })
  async markAllAsRead(@CurrentSession() session: any) {
    try {
      return await firstValueFrom(
        this.notificationService.markAllAsRead({
          userId: session.userId,
        }),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to mark all notifications as read',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notification count' })
  @ApiResponse({ status: 200, description: 'Unread count retrieved.' })
  async getUnreadCount(@CurrentSession() session: any) {
    try {
      return await firstValueFrom(
        this.notificationService.getUnreadCount({
          userId: session.userId,
        }),
      );
    } catch (error: any) {
      throw new HttpException(
        error.details || 'Failed to get unread count',
        grpcToHttpStatus(error.code) || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
