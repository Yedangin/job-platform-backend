import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NotificationPrismaService } from 'libs/common/src';
import {
  NotificationChannel as PrismaChannel,
  NotificationType as PrismaNotificationType,
} from '../../../generated/prisma-notification';
import { RedisPubService } from './redis-pub/redis-pub.service';
import { EmailJobData } from './queue/email.processor';
import {
  SendNotificationRequest,
  BroadcastNotificationRequest,
  BroadcastNotificationResponse,
  GetNotificationsRequest,
  MarkAsReadRequest,
  MarkAllAsReadRequest,
  GetUnreadCountRequest,
  GetAllUserIdsRequest,
  GetAllUserIdsResponse,
  NotificationResponse,
  NotificationsListResponse,
  UnreadCountResponse,
} from 'types/notification/notification';

@Injectable()
export class NotificationServiceService {
  private readonly logger = new Logger(NotificationServiceService.name);

  constructor(
    private readonly prisma: NotificationPrismaService,
    private readonly redisPub: RedisPubService,
    @InjectQueue('email-queue') private readonly emailQueue: Queue,
  ) {}

  async sendNotification(
    request: SendNotificationRequest,
  ): Promise<NotificationResponse> {
    try {
      // gRPC loader with enums: String passes enum values as strings at runtime
      const channelStr = String(request.channel || 'BOTH');
      const typeStr = String(request.notificationType || 'REMINDER');

      const notification = await this.prisma.notification.create({
        data: {
          userId: request.userId,
          email: request.email,
          subject: request.subject,
          content: request.content,
          notificationType: typeStr as PrismaNotificationType,
          channel: channelStr as PrismaChannel,
          priority: request.priority,
          metadata: request.metadata,
          relatedInterviewId: request.relatedInterviewId,
          relatedJobPostId: request.relatedJobPostId,
          status: 'PENDING',
          maxAttempts: 3,
          attempts: 0,
          isRead: false,
        },
      });

      // Publish real-time push notification via Redis
      if (channelStr === 'PUSH' || channelStr === 'BOTH') {
        await this.redisPub.publishNotification(request.userId, {
          id: notification.id,
          userId: notification.userId,
          subject: notification.subject,
          content: notification.content,
          notificationType: notification.notificationType,
          channel: notification.channel,
          isRead: false,
          relatedInterviewId: notification.relatedInterviewId,
          relatedJobPostId: notification.relatedJobPostId,
          createdAt: notification.createdAt.toISOString(),
        });
      }

      // Queue email if channel includes EMAIL
      if ((channelStr === 'EMAIL' || channelStr === 'BOTH') && request.email) {
        const jobData: EmailJobData = {
          notificationId: notification.id,
          to: request.email,
          subject: request.subject || 'Notification',
          content: request.content || '',
          notificationType: typeStr,
          metadata: request.metadata ? JSON.parse(request.metadata) : undefined,
        };

        await this.emailQueue.add('send-email', jobData, {
          priority: request.priority || 0,
        });

        this.logger.log(`Email queued for notification ${notification.id}`);
      }

      return {
        success: true,
        message: 'Notification created successfully',
        notification: this.mapToProto(notification),
      };
    } catch (error) {
      this.logger.error('Failed to create notification', error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to create notification',
      };
    }
  }

  async getNotifications(
    request: GetNotificationsRequest,
  ): Promise<NotificationsListResponse> {
    const page = parseInt(request.basicQuery?.page || '1');
    const limit = parseInt(request.basicQuery?.limit || '10');
    const skip = (page - 1) * limit;

    const where: any = { userId: request.userId };

    if (request.notificationType) {
      where.notificationType = String(request.notificationType);
    }

    const [notifications, count] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.notification.count({ where }),
    ]);

    return {
      data: notifications.map((n) => this.mapToProto(n)),
      meta: {
        count,
        page,
        pageCount: Math.ceil(count / limit),
        limit,
      },
    };
  }

  async markAsRead(request: MarkAsReadRequest): Promise<NotificationResponse> {
    try {
      const notification = await this.prisma.notification.update({
        where: {
          id: request.notificationId,
          userId: request.userId,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });

      return {
        success: true,
        message: 'Notification marked as read',
        notification: this.mapToProto(notification),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to mark notification as read',
      };
    }
  }

  async markAllAsRead(
    request: MarkAllAsReadRequest,
  ): Promise<NotificationResponse> {
    await this.prisma.notification.updateMany({
      where: {
        userId: request.userId,
        isRead: false,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return {
      success: true,
      message: 'All notifications marked as read',
    };
  }

  async getUnreadCount(
    request: GetUnreadCountRequest,
  ): Promise<UnreadCountResponse> {
    const count = await this.prisma.notification.count({
      where: {
        userId: request.userId,
        isRead: false,
      },
    });

    return { count };
  }

  async broadcastNotification(
    request: BroadcastNotificationRequest,
  ): Promise<BroadcastNotificationResponse> {
    try {
      const results = await Promise.allSettled(
        request.userIds.map((userId) =>
          this.sendNotification({
            userId,
            subject: request.subject,
            content: request.content,
            notificationType: request.notificationType,
            channel: request.channel,
            metadata: request.metadata,
          }),
        ),
      );

      const sent = results.filter(
        (r) => r.status === 'fulfilled' && r.value.success,
      ).length;
      const failed = results.length - sent;

      return {
        success: true,
        sent,
        failed,
        message: `Broadcast complete: ${sent} sent, ${failed} failed`,
      };
    } catch (error) {
      this.logger.error('Broadcast failed', error);
      return {
        success: false,
        sent: 0,
        failed: request.userIds.length,
        message:
          error instanceof Error ? error.message : 'Broadcast failed',
      };
    }
  }

  async getAllUserIds(
    _request: GetAllUserIdsRequest,
  ): Promise<GetAllUserIdsResponse> {
    const result = await this.prisma.notification.findMany({
      select: { userId: true },
      distinct: ['userId'],
    });
    return { userIds: result.map((r) => r.userId) };
  }

  private mapToProto(n: any) {
    return {
      id: n.id,
      userId: n.userId,
      email: n.email ?? undefined,
      subject: n.subject ?? undefined,
      content: n.content ?? undefined,
      notificationType: n.notificationType as any,
      status: n.status as any,
      channel: n.channel as any,
      priority: n.priority ?? undefined,
      isRead: n.isRead ?? false,
      relatedInterviewId: n.relatedInterviewId ?? undefined,
      relatedJobPostId: n.relatedJobPostId ?? undefined,
      metadata: n.metadata ?? undefined,
      createdAt:
        n.createdAt instanceof Date ? n.createdAt.toISOString() : n.createdAt,
      readAt:
        n.readAt instanceof Date
          ? n.readAt.toISOString()
          : (n.readAt ?? undefined),
      sendedAt:
        n.sendedAt instanceof Date
          ? n.sendedAt.toISOString()
          : (n.sendedAt ?? undefined),
    };
  }
}
