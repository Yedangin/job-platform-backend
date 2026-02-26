import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplyJobController } from './apply.controller';
import { ApplyJobServices } from './apply.service';
import { JobPrismaService } from 'libs/common/src';
import { FileService } from 'libs/common/src/common/file/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes ConfigService available everywhere
      envFilePath: '.env', // optional, defaults to .env
    }),
  ],
  controllers: [ApplyJobController],
  providers: [ApplyJobServices, JobPrismaService, FileService],
  exports: [JobPrismaService],
})
export class ApplyModule {}
