import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  EmailPriority,
  EmailType,
  NotificationPrismaService,
} from '@in-job/common';
import { EmailQueueItem } from '../interfaces/email-queue.interface';
import { NotificationType } from 'generated/prisma-notification';

@Injectable()
export class EmailQueueService {
  private readonly logger = new Logger(EmailQueueService.name);

  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    private readonly prisma: NotificationPrismaService
  ) {}

  /**
   * Add email to queue
   */
  async addToQueue(
    emailData: Omit<EmailQueueItem, 'id' | 'attempts' | 'createdAt'>
  ): Promise<string> {
    try {
      console.log('Adding email to queue:', emailData);
      // Create notification record in database
      const notification = await this.prisma.notification.create({
        data: {
          userId: emailData.userId,
          email: emailData.email,
          subject: emailData.subject,
          // content: emailData.content,
          notificationType: NotificationType.STATUS_ALERT,
          status: 'PENDING',
          priority: emailData.priority,
          attempts: 0,
          maxAttempts: emailData.maxAttempts,
          metadata: emailData.metadata
            ? JSON.stringify(emailData.metadata)
            : null,
        },
      });

      // Add to BullMQ queue
      const job = await this.emailQueue.add(
        'send-email',
        {
          notificationId: notification.id,
          ...emailData,
        },
        {
          priority: emailData.priority,
          attempts: emailData.maxAttempts,
          backoff: {
            type: 'exponential',
            delay: 5000, // Start with 5 seconds
          },
          removeOnComplete: 100, // Keep last 100 completed jobs
          removeOnFail: 500, // Keep last 500 failed jobs
        }
      );

      this.logger.log(
        `Email queued successfully: ${job.id} for ${emailData.email}`
      );
      return notification.id;
    } catch (error) {
      this.logger.error('Failed to add email to queue:', error);
      throw error;
    }
  }

  /**
   * Get priority based on email type
   */
  getPriorityByType(type: EmailType): EmailPriority {
    switch (type) {
      case EmailType.EMAIL_VERIFICATION:
      case EmailType.INTERVIEW:
        return EmailPriority.HIGH;
      case EmailType.GENERAL:
        return EmailPriority.LOW;
      default:
        return EmailPriority.LOW;
    }
  }

  /**
   * Map EmailType to NotificationType
   */
  private mapEmailTypeToNotificationType(emailType: EmailType): string {
    switch (emailType) {
      case EmailType.EMAIL_VERIFICATION:
        return 'EMAIL_VERIFICATION';
      case EmailType.INTERVIEW:
        return 'INTERVIEW_UPDATE';
      case EmailType.GENERAL:
        return 'PROMOTION';
      default:
        return 'REMINDER';
    }
  }

  /**
   * Get queue statistics
   */
  async getQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.emailQueue.getWaitingCount(),
      this.emailQueue.getActiveCount(),
      this.emailQueue.getCompletedCount(),
      this.emailQueue.getFailedCount(),
      this.emailQueue.getDelayedCount(),
    ]);

    return {
      waiting,
      active,
      completed,
      failed,
      delayed,
    };
  }
}
