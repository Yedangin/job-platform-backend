import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';

import { JobApplicationCrudQueueProcessor } from './job-application-create-update.processor';
import { JobModule } from '../module/job/job.module';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({ name: 'job-application-crud-queue' }),
    JobModule,
  ],
  providers: [JobApplicationCrudQueueProcessor],
  exports: [BullModule],
})
export class QueueModule {}
