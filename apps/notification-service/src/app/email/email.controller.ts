import { Controller, Logger } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  EmailType,
  SendGeneralEmailEvent,
  SendInterviewEmailEvent,
  SendVerificationEmailEvent,
} from '@in-job/common';

@Controller()
export class EmailController {
  private readonly logger = new Logger(EmailController.name);
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern(EmailType.EMAIL_VERIFICATION)
  async handleEmailVerification(
    @Payload() data: SendVerificationEmailEvent['data']
  ) {
    this.logger.log('Received email verification request:', data);
    // return this.emailService.handleEmailVerification(data);
  }

  @MessagePattern(EmailType.GENERAL)
  async handleGeneralEmail(@Payload() data: SendGeneralEmailEvent['data']) {
    this.logger.log('Received general email request:', data);
    // return this.emailService.handleGeneralEmail(data);
  }

  @MessagePattern(EmailType.INTERVIEW)
  async handleInterviewEmail(@Payload() data: SendInterviewEmailEvent['data']) {
    this.logger.log('Received interview email request:', data);
    // return this.emailService.handleInterviewEmail(data);
  }
}
