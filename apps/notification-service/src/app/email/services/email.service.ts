import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailType, NotificationPrismaService } from '@in-job/common';
import { EmailTemplateService } from './template.service';
import { EmailQueueService } from './email-queue.service';
import { EmailQueueDto, EmailSendingResponseDto } from '../dto/email-queue.dto';
import {
  EmailVerificationData,
  InterviewEmailData,
  GeneralEmailData,
} from '../interfaces/email-queue.interface';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly templateService: EmailTemplateService,
    private readonly emailQueueService: EmailQueueService,
    private readonly prisma: NotificationPrismaService
  ) {}

  /**
   * Queue email for sending
   */
  async queueEmail(emailData: EmailQueueDto): Promise<EmailSendingResponseDto> {
    try {
      const priority = this.emailQueueService.getPriorityByType(emailData.type);

      const emailId = await this.emailQueueService.addToQueue({
        userId: emailData.userId,
        email: emailData.email,
        subject: emailData.subject,
        content: emailData.content,
        type: emailData.type,
        priority,
        metadata: emailData.metadata,
        maxAttempts: 3,
      });

      return {
        id: emailId,
        status: 'queued',
        message: 'Email has been queued for sending',
      };
    } catch (error) {
      this.logger.error('Failed to queue email:', error);
      return {
        id: '',
        status: 'error',
        message: 'Failed to queue email',
      };
    }
  }

  /**
   * Send email using nodemailer
   */
  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: htmlContent,
      });

      this.logger.log(`Email sent successfully to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  /**
   * Handle email verification
   */
  async handleEmailVerification(data: {
    userId?: string;
    fullName?: string;
    email: string;
    verificationToken: string;
    verificationUrl: string;
  }): Promise<EmailSendingResponseDto> {
    const verificationData: EmailVerificationData = {
      fullName: data.fullName || 'User',
      verificationToken: data.verificationToken,
      verificationUrl: data.verificationUrl,
    };

    const template = this.templateService.getTemplate(
      EmailType.EMAIL_VERIFICATION,
      verificationData
    );

    if (!template) {
      throw new Error('Email template not found');
    }

    return this.queueEmail({
      userId: data.userId,
      email: data.email,
      subject: template.subject,
      content: template.content,
      type: EmailType.EMAIL_VERIFICATION,
      metadata: verificationData,
    });
  }

  /**
   * Handle interview invitation email
   */
  async handleInterviewEmail(data: {
    userId: string;
    email: string;
    interviewData: InterviewEmailData;
  }): Promise<EmailSendingResponseDto> {
    const template = this.templateService.getTemplate(
      EmailType.INTERVIEW,
      data.interviewData
    );

    if (!template) {
      throw new Error('Email template not found');
    }

    return this.queueEmail({
      userId: data.userId,
      email: data.email,
      subject: template.subject,
      content: template.content,
      type: EmailType.INTERVIEW,
      metadata: data.interviewData,
    });
  }

  /**
   * Handle general email
   */
  async handleGeneralEmail(data: {
    email: string;
    generalData: GeneralEmailData;
  }): Promise<EmailSendingResponseDto> {
    const template = this.templateService.getTemplate(
      EmailType.GENERAL,
      data.generalData
    );

    if (!template) {
      throw new Error('Email template not found');
    }

    return this.queueEmail({
      email: data.email,
      subject: template.subject,
      content: template.content,
      type: EmailType.GENERAL,
      metadata: data.generalData,
    });
  }
}
