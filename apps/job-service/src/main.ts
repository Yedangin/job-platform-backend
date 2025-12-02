import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { REPORTS_PACKAGE_NAME } from 'types/job/report';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_RESPONSE_PACKAGE_NAME } from 'types/common/response';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.JOB_SERVICE_PORT || 8003;

  const protoDir = join(process.cwd(), 'proto/');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [
          REPORTS_PACKAGE_NAME,
          COMMON_BASIC_QUERY_PACKAGE_NAME,
          COMMON_BASIC_RESPONSE_PACKAGE_NAME,
          COMMON_BASIC_USAGE_PACKAGE_NAME,
        ],
        protoPath: [
          join(protoDir, 'job/report.proto'),
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
    },
  );

  await app.listen();

  Logger.log(`🚀 Job Service is running on: localhost:${port}`);
}
bootstrap();
