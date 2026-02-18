import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { NotificationServiceModule } from './notification-service.module';
import { NOTIFICATION_PACKAGE_NAME } from 'types/notification/notification';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { COMMON_BASIC_RESPONSE_PACKAGE_NAME } from 'types/common/response';

async function bootstrap() {
  const port = process.env.NOTIFICATION_SERVICE_PORT || 8004;

  const protoDir = join(process.cwd(), 'proto/');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [
          NOTIFICATION_PACKAGE_NAME,
          COMMON_BASIC_QUERY_PACKAGE_NAME,
          COMMON_BASIC_USAGE_PACKAGE_NAME,
          COMMON_BASIC_RESPONSE_PACKAGE_NAME,
        ],
        protoPath: [
          join(protoDir, 'notification/notification.proto'),
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

  Logger.log(`Notification Service is running on: localhost:${port}`);
  Logger.log(`Packages: ${NOTIFICATION_PACKAGE_NAME}`);
}

void bootstrap();
