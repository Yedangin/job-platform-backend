import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './services/email.service';
import { EmailTemplateService } from './services/template.service';
import { EmailQueueService } from './services/email-queue.service';
import { EmailController } from './email.controller';
import { EmailProcessor } from './processor/email.processor';

@Module({
  imports: [
    ConfigModule,
    // BullMQ Queue Configuration
    BullModule.registerQueue({
      name: 'email',
    }),
    // Mailer Configuration
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: configService.get('MAIL_SECURE') === 'true',
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Job Chaja" <${configService.get('MAIL_FROM')}>`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [EmailController],
  providers: [
    EmailService,
    EmailTemplateService,
    EmailQueueService,
    EmailProcessor,
  ],
  exports: [EmailService],
})
export class EmailModule {}
