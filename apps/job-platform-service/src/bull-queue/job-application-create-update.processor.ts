import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as moment from 'moment-timezone';
// import {
//   JobPrismaService,
//   PaginationResult,
//   PaginationService,
// } from 'libs/common/src';
import { PackagePriceDto, JobApplyDataDto } from './dto/job-apply-crud.dto';
import { JobPrismaService } from 'libs/common/src';

@Processor('job-application-crud-queue')
export class JobApplicationCrudQueueProcessor extends WorkerHost {
  constructor(private readonly prisma: JobPrismaService) {
    super();
  }
  async process(job: Job): Promise<Record<string, boolean>> {
    if (job.name === 'job-application-variant-create-update') {
      try {
        const { id, proposedBy, selectedSlotId, proposedTime } =
          job.data as JobApplyDataDto;
        // await this.prisma.$transaction(async (prisma) => {
        await this.prisma.jobApplication.update({
          where: { appId: BigInt(id) },
          data: {
            proposedBy: proposedBy,
            selectedSlotId: selectedSlotId,
            proposedTime: proposedTime,
          },
        });
        // });
      } catch (error) {
        console.log(error);

        return { success: false };
      }
    }

    return { success: true };
  }
}
