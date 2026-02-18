import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export interface SendEmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: SendEmailOptions): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        template: options.template,
        context: options.context,
      });
      this.logger.log(`Email sent to ${options.to}: ${options.subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}`, error);
      throw error;
    }
  }

  getTemplateForType(notificationType: string): string {
    const templateMap: Record<string, string> = {
      APPLICATION_ALERT: 'application-alert',
      INTERVIEW_UPDATE: 'interview-update',
      EMAIL_VERIFICATION: 'email-verification',
      STATUS_ALERT: 'status-alert',
      REMINDER: 'status-alert',
      PROMOTION: 'status-alert',
      FINANCIAL_ALERT: 'status-alert',
    };

    return templateMap[notificationType] || 'status-alert';
  }
}
