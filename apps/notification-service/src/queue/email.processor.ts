import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { EmailService } from '../email/email.service';
import { NotificationPrismaService } from 'libs/common/src';

export interface EmailJobData {
  notificationId: string;
  to: string;
  subject: string;
  content: string;
  notificationType: string;
  metadata?: Record<string, any>;
}

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: NotificationPrismaService,
  ) {
    super();
  }

  async process(job: Job<EmailJobData>): Promise<void> {
    const { notificationId, to, subject, content, notificationType, metadata } =
      job.data;

    this.logger.log(
      `Processing email job ${job.id} for notification ${notificationId}`,
    );

    try {
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          status: 'SENDING',
          attempts: job.attemptsMade + 1,
        },
      });

      const template = this.emailService.getTemplateForType(notificationType);

      await this.emailService.sendEmail({
        to,
        subject,
        template,
        context: {
          subject,
          content,
          notificationType,
          actionUrl: process.env.CLIENT_URL || 'http://localhost:3000',
          year: new Date().getFullYear(),
          ...metadata,
        },
      });

      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          status: 'SENT',
          sendedAt: new Date(),
        },
      });

      this.logger.log(
        `Email sent successfully for notification ${notificationId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send email for notification ${notificationId}`,
        error,
      );

      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          status: 'FAILED',
          failedAt: new Date(),
          errorMessage: error instanceof Error ? error.message : String(error),
          attempts: job.attemptsMade + 1,
        },
      });

      throw error;
    }
  }
}
