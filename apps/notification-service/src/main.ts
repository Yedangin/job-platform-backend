import { NestFactory } from '@nestjs/core';
import { NotificationServiceModule } from './notification-service.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);
  app.use(helmet());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
