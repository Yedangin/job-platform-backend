import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobController } from './job.controller';
import { JobServices } from './job.service';
import { JobPrismaService } from 'libs/common/src';
import { FileService } from 'libs/common/src/common/file/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
      envFilePath: '.env', // optional, defaults to .env
    }),
  ],
  controllers: [JobController],
  providers: [JobServices, JobPrismaService, FileService],
  exports: [JobPrismaService],
})
export class JobModule {}
