import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth/auth';
import { MEMBER_VERFICATION_PACKAGE_NAME } from 'types/proto/auth/member-verification';
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.AUTH_SERVICE_PORT || 8001;

  const protoDir = join(process.cwd(), 'proto/auth');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [AUTH_PACKAGE_NAME, MEMBER_VERFICATION_PACKAGE_NAME],
        protoPath: [
          join(protoDir, 'auth.proto'),
          join(protoDir, 'member-verification.proto'),
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
    `📦 Packages: ${AUTH_PACKAGE_NAME}, ${MEMBER_VERFICATION_PACKAGE_NAME}`,
  );
}

void bootstrap();
