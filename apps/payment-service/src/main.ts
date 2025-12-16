import { PAYMENT_PACKAGE_NAME } from 'types/payment/payment';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';

async function bootstrap() {
  const port = process.env.PAYMENT_SERVICE_PORT || 8005;

  const protoDir = join(process.cwd(), '/proto');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,

    {
      transport: Transport.GRPC,
      options: {
        package: [
          PAYMENT_PACKAGE_NAME,
          COMMON_BASIC_QUERY_PACKAGE_NAME,
          COMMON_BASIC_QUERY_PACKAGE_NAME,
          COMMON_BASIC_USAGE_PACKAGE_NAME,
        ],
        protoPath: [
          join(protoDir, 'payment/payment.proto'),
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

  Logger.log(`🚀 Payment Service is running on: localhost:${port}`);
  Logger.log(`📦 Packages: auth,user, member and operate`);
}

bootstrap();
