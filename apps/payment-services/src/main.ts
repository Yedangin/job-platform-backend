import { NestFactory } from '@nestjs/core';
import { PaymentServicesModule } from './payment-services.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(PaymentServicesModule);
  app.use(helmet());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
