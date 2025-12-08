/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { REPORTS_PACKAGE_NAME } from 'types/job/report';
import { CATEGORY_PACKAGE_NAME } from 'types/job/category';
import { JOBPOST_PACKAGE_NAME } from 'types/job/job-post';
import { APPLIES_PACKAGE_NAME } from 'types/job/apply';
import { INTERVIEW_PACKAGE_NAME } from 'types/job/interview';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { REVIEWS_PACKAGE_NAME } from 'types/job/review';

async function bootstrap() {
  const port = process.env.JOB_SERVICE_PORT || 8003;

  const protoDir = join(process.cwd(), '/proto');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [
          REPORTS_PACKAGE_NAME,
          CATEGORY_PACKAGE_NAME,
          JOBPOST_PACKAGE_NAME,
          APPLIES_PACKAGE_NAME,
          INTERVIEW_PACKAGE_NAME,
          REVIEWS_PACKAGE_NAME,
          COMMON_BASIC_QUERY_PACKAGE_NAME,
          COMMON_BASIC_QUERY_PACKAGE_NAME,
          COMMON_BASIC_USAGE_PACKAGE_NAME,
        ],
        protoPath: [
          join(protoDir, 'job/report.proto'),
          join(protoDir, 'job/category.proto'),
          join(protoDir, 'job/interview.proto'),
          join(protoDir, 'job/review.proto'),
          join(protoDir, 'job/job-post.proto'),
          join(protoDir, 'job/apply.proto'),
          join(protoDir, 'common/basic-query.proto'),
          join(protoDir, 'common/basic.proto'),
          join(protoDir, 'common/response.proto'),
        ],
        url: `0.0.0.0:${port}`,
        loader: {
          includeDirs: [protoDir],
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          arrays: true,
          objects: true,
        },
      },
    }
  );

  await app.listen();

  Logger.log(`🚀 Job Service is running on: localhost:${port}`);
  Logger.log(`📦 Packages: auth,user, member and operate`);
}

bootstrap();
