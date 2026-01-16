import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { EmailService } from '../services/email.service';
import { NotificationPrismaService } from '@in-job/common';

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: NotificationPrismaService
  ) {
    super();
  }

  async process(job: Job): Promise<any> {
    const { notificationId, email, subject, content } = job.data;

    this.logger.log(
      `Processing email job ${job.id} for ${email} (Notification: ${notificationId})`
    );

    try {
      // Update notification status to SENDING
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          status: 'SENDING',
          attempts: job.attemptsMade + 1,
        },
      });

      // Send email
      await this.emailService.sendEmail(email, subject, content);

      // Update notification status to success
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          status: 'PENDING', // Mark as sent (you might want to add a SENT status)
          sendedAt: new Date(),
          isRead: false,
        },
      });

      this.logger.log(`Email sent successfully: ${job.id}`);
      return { success: true, notificationId };
    } catch (error) {
      this.logger.error(`Failed to send email ${job.id}:`, error);

      // Update notification status to FAILED
      await this.prisma.notification.update({
        where: { id: notificationId },
        data: {
          status: 'FAILED',
          attempts: job.attemptsMade + 1,
          failedAt: new Date(),
          errorMessage: error.message,
        },
      });

      throw error; // Re-throw to trigger retry
    }
  }
}
