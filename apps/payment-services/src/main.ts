import { NestFactory } from '@nestjs/core';
import { PaymentServicesModule } from './payment-services.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentServicesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
