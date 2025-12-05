import { Global, Module } from '@nestjs/common';
import { JobPrismaService } from './job-prisma.service';

@Global()
@Module({
  providers: [JobPrismaService],
  exports: [JobPrismaService],
})
export class JobPrismaModule {}
