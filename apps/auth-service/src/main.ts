/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/auth/auth';
import { MEMBER_VERFICATION_PACKAGE_NAME } from 'types/auth/member-verification';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { USERS_PACKAGE_NAME } from 'types/auth/users';
import { CORPORATE_REGISTRATION_PACKAGE_NAME } from 'types/auth/corporate-registration';
import { COMMON_BASIC_RESPONSE_PACKAGE_NAME } from 'types/common/response';
import { USER_INFORMATION_PACKAGE_NAME } from 'types/auth/user-information';

async function bootstrap() {
const port = process.env.AUTH_SERVICE_PORT || 8001;

  const protoDir = join(process.cwd(), 'proto/');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [
          AUTH_PACKAGE_NAME,
          USERS_PACKAGE_NAME,
          COMMON_BASIC_QUERY_PACKAGE_NAME,
          COMMON_BASIC_RESPONSE_PACKAGE_NAME,
          COMMON_BASIC_USAGE_PACKAGE_NAME,
          MEMBER_VERFICATION_PACKAGE_NAME,
          USER_INFORMATION_PACKAGE_NAME,
          CORPORATE_REGISTRATION_PACKAGE_NAME,
        ],
        protoPath: [
          join(protoDir, 'auth/auth.proto'),
          join(protoDir, 'auth/users.proto'),
          join(protoDir, 'auth/user-information.proto'),
          join(protoDir, 'auth/member-verification.proto'),
          join(protoDir, 'auth/corporate-registration.proto'),
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

  Logger.log(`🚀 Auth Service is running on: localhost:${port}`);
  Logger.log(
    `📦 Packages: auth,user, member and operate`,
  );
}

bootstrap();
