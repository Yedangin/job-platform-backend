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
      // 기존 매핑 / Existing mappings
      APPLICATION_ALERT: 'application-alert',
      INTERVIEW_UPDATE: 'interview-update',
      EMAIL_VERIFICATION: 'email-verification',
      STATUS_ALERT: 'status-alert',
      REMINDER: 'status-alert',
      PROMOTION: 'status-alert',
      FINANCIAL_ALERT: 'status-alert',

      // 기업인증 / Corporate verification
      CORP_VERIFY_SUBMITTED: 'corp-verify',
      CORP_VERIFY_APPROVED: 'corp-verify',
      CORP_VERIFY_REJECTED: 'corp-verify',

      // 비자 관련 / Visa-related
      VISA_VERIFY_APPROVED: 'visa-alert',
      VISA_VERIFY_REJECTED: 'visa-alert',
      VISA_EXPIRY_WARNING: 'visa-alert',
      VISA_VERIFY_REMINDER: 'visa-alert',

      // 프로필 / Profile
      PROFILE_REMINDER: 'profile-reminder',
      PROFILE_COMPLETE: 'status-alert',

      // 비자 플래너 / Visa planner
      COUPON_ACTIVATED: 'coupon-alert',
      COUPON_EXPIRY_WARNING: 'coupon-alert',
      PLANNER_PAYMENT_CONFIRM: 'status-alert',

      // 공고 / Job posting
      JOB_ACTIVATED: 'job-alert',
      JOB_EXPIRY_WARNING: 'job-alert',
      JOB_SUSPENDED: 'job-alert',
      JOB_UNSUSPENDED: 'job-alert',

      // 채용 / Hiring
      NEW_APPLICANT: 'application-alert',
      DOCUMENT_PASSED: 'hiring-result',
      INTERVIEW_CONFIRMED: 'interview-update',
      INTERVIEW_REMINDER: 'interview-update',
      FINAL_ACCEPTED: 'hiring-result',
      HIRING_REJECTED: 'hiring-result',
      APPLICATION_EXPIRED: 'status-alert',

      // 공통 / General
      SUPPORT_REPLIED: 'status-alert',
      PREMIUM_EXPIRY_WARNING: 'job-alert',
      PREMIUM_REMOVED: 'job-alert',

      // 쿠폰 / Coupons
      GENERAL_COUPON_ISSUED: 'coupon-alert',
      GENERAL_COUPON_EXPIRY: 'coupon-alert',
    };

    return templateMap[notificationType] || 'status-alert';
  }
}
