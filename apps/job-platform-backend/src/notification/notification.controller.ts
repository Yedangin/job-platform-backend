import {
  Controller,
  Get,
  Body,
  Param,
  Patch,
  Put,
  Post,
  Query,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
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
  RolesGuard,
  Roles,
  CurrentSession,
  grpcToHttpStatus,
  AuthPrismaService,
} from 'libs/common/src';
import { NotificationTriggerService } from './notification-trigger.service';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(SessionAuthGuard)
export class NotificationController implements OnModuleInit {
  private notificationService: NotificationServiceClient;

  constructor(
    @Inject(NOTIFICATION_PACKAGE_NAME) private client: ClientGrpc,
    private readonly prisma: AuthPrismaService,
    private readonly trigger: NotificationTriggerService,
  ) {}

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

  // 어드민 전용: Guard + Decorator 패턴으로 권한 검증
  // Admin only: auth verified via Guard + Decorator pattern
  @Post('broadcast')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
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
        return {
          success: false,
          sent: 0,
          failed: 0,
          message: 'No users found',
        };
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
      return await firstValueFrom(this.notificationService.getAllUserIds({}));
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
          userId: body.targetUserId || session.userId,
          email: body.targetEmail || session.email,
          subject: body.title || 'Test Notification',
          content:
            body.message ||
            'This is a test notification from /notifications/test.',
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

  // ──── 알림 설정 / Notification preferences ────

  /**
   * 알림 설정 조회 / Get notification preferences
   */
  @Get('preferences')
  @ApiOperation({ summary: '알림 설정 조회 / Get notification preferences' })
  @ApiResponse({ status: 200, description: 'Preferences retrieved.' })
  async getPreferences(@CurrentSession() session: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        notifSms: true,
        notifEmail: true,
        notifKakao: true,
        notifEnabledAt: true,
        notifSmsEnabledAt: true,
        notifEmailEnabledAt: true,
        notifKakaoEnabledAt: true,
        marketingConsent: true,
        marketingConsentAt: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  /**
   * 알림 설정 변경 / Update notification preferences
   */
  @Put('preferences')
  @ApiOperation({ summary: '알림 설정 변경 / Update notification preferences' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        notifSms: {
          type: 'boolean',
          description: 'SMS 수신 동의 / SMS notifications',
        },
        notifEmail: {
          type: 'boolean',
          description: '이메일 수신 동의 / Email notifications',
        },
        notifKakao: {
          type: 'boolean',
          description: '카카오톡 수신 동의 / KakaoTalk notifications',
        },
        marketingConsent: {
          type: 'boolean',
          description: '마케팅 수신 동의 / Marketing consent',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Preferences updated.' })
  async updatePreferences(
    @CurrentSession() session: any,
    @Body()
    body: {
      notifSms?: boolean;
      notifEmail?: boolean;
      notifKakao?: boolean;
      marketingConsent?: boolean;
    },
  ) {
    const now = new Date();
    const updateData: Record<string, unknown> = {};

    // 각 채널별 동의 시간 관리 / Manage per-channel consent timestamps
    if (body.notifSms !== undefined) {
      updateData.notifSms = body.notifSms;
      if (body.notifSms) updateData.notifSmsEnabledAt = now;
    }
    if (body.notifEmail !== undefined) {
      updateData.notifEmail = body.notifEmail;
      if (body.notifEmail) updateData.notifEmailEnabledAt = now;
    }
    if (body.notifKakao !== undefined) {
      updateData.notifKakao = body.notifKakao;
      if (body.notifKakao) updateData.notifKakaoEnabledAt = now;
    }
    if (body.marketingConsent !== undefined) {
      updateData.marketingConsent = body.marketingConsent;
      if (body.marketingConsent) updateData.marketingConsentAt = now;
    }

    // 하나라도 활성화 시 notifEnabledAt 갱신 / Update notifEnabledAt if any channel enabled
    const anyEnabled = body.notifSms || body.notifEmail || body.notifKakao;
    if (anyEnabled) {
      updateData.notifEnabledAt = now;
    }

    const user = await this.prisma.user.update({
      where: { id: session.userId },
      data: updateData,
      select: {
        notifSms: true,
        notifEmail: true,
        notifKakao: true,
        notifEnabledAt: true,
        notifSmsEnabledAt: true,
        notifEmailEnabledAt: true,
        notifKakaoEnabledAt: true,
        marketingConsent: true,
        marketingConsentAt: true,
      },
    });

    return user;
  }

  /**
   * 이벤트 카탈로그 조회 (어드민) / Get event catalog (admin)
   */
  @Get('event-catalog')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({
    summary:
      '알림 이벤트 카탈로그 조회 / Get notification event catalog (admin)',
  })
  @ApiResponse({ status: 200, description: 'Event catalog retrieved.' })
  async getEventCatalog() {
    return this.trigger.getEventCatalog();
  }
}
