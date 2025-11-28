import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/auth/auth';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { USERS_PACKAGE_NAME } from 'types/auth/users';

async function bootstrap() {
  const port = process.env.AUTH_SERVICE_PORT || 8001;

  // Use absolute path from project root (works in both dev and prod)
  // const protoPath = [
  //   join(process.cwd(), 'proto/auth/auth.proto'),
  //   join(process.cwd(), 'proto/auth/users.proto'),
  //   join(process.cwd(), 'proto/common/basic.proto'),
  //   join(process.cwd(), 'proto/common/basic-query.proto'),
  // ];
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
          COMMON_BASIC_USAGE_PACKAGE_NAME,
        ],
        protoPath: [
          join(protoDir, 'auth/auth.proto'),
          join(protoDir, 'auth/users.proto'),
          join(protoDir, 'common/basic-query.proto'),
          join(protoDir, 'common/basic.proto'),
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
  Logger.log(`📦 Package: ${AUTH_PACKAGE_NAME}`);
}

bootstrap();
