import { NestFactory } from '@nestjs/core';
import { ChatServiceModule } from './chat-service.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(ChatServiceModule);
  app.use(helmet());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
