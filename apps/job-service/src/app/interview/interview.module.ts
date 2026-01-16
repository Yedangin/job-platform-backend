import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { JobPostService } from '../job-post/job-post.service';
import { CategoryService } from '../category/category.service';
import { AuthPrismaService, JobPrismaService, PaginationService } from '@in-job/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth-service-queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [InterviewController],
  providers: [
    InterviewService,
    JobPostService,
    CategoryService,
    PaginationService,
    JobPrismaService,
    AuthPrismaService,
  ],
})
export class InterviewModule {}
