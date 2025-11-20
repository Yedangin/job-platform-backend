import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth/auth';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.AUTH_SERVICE_PORT || 8001;

  // Use absolute path from project root (works in both dev and prod)
  const protoPath = join(process.cwd(), 'proto/auth/auth.proto');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: AUTH_PACKAGE_NAME,
        protoPath,
        url: `0.0.0.0:${port}`,
      },
    },
  );

  await app.listen();

  Logger.log(`🚀 Auth Service is running on: localhost:${port}`);
  Logger.log(`📦 Package: ${AUTH_PACKAGE_NAME}`);
}

bootstrap();
