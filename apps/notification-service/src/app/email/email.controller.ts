import { Controller, Logger } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailType } from '@in-job/common';

@Controller()
export class EmailController {
  private readonly logger = new Logger(EmailController.name);
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern(EmailType.EMAIL_VERIFICATION)
  async handleEmailVerification(@Payload() data: any) {
    this.logger.log('Received email verification request:', data);

    try {
      return await this.emailService.handleEmailVerification({
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        verificationToken: data.token,
        verificationUrl: data.verificationUrl,
      });
    } catch (error) {
      this.logger.error('Failed to handle email verification:', error);
      throw error;
    }
  }

  @MessagePattern(EmailType.INTERVIEW)
  async handleInterviewEmail(@Payload() data: any) {
    this.logger.log('Received interview email request:', data);

    try {
      return await this.emailService.handleInterviewEmail({
        userId: data.userId,
        email: data.email,
        interviewData: data.interviewData,
      });
    } catch (error) {
      this.logger.error('Failed to handle interview email:', error);
      throw error;
    }
  }

  @MessagePattern(EmailType.GENERAL)
  async handleGeneralEmail(@Payload() data: any) {
    this.logger.log('Received general email request:', data);

    try {
      return await this.emailService.handleGeneralEmail({
        email: data.email,
        generalData: data.generalData,
      });
    } catch (error) {
      this.logger.error('Failed to handle general email:', error);
      throw error;
    }
  }
}
