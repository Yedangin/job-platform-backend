/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const port = process.env.NOTIFICATION_SERVICE_PORT || 8004;

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'auth-service-queue',
      queueOptions: {
        durable: false
      }
    }
  });

  // Enable CORS for WebSocket and REST
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'http://localhost:8000',
  //     'http://127.0.0.1:5500',
  //     'http://localhost:5500',
  //   ],
  //   credentials: true,
  // });

  await app.listen();
  Logger.log(
    `🚀 Notification Service is running`
  );
}

bootstrap();
