import { Module } from '@nestjs/common';
import { PaymentServicesController } from './payment-services.controller';
import { PaymentServicesService } from './payment-services.service';

@Module({
  imports: [],
  controllers: [PaymentServicesController],
  providers: [PaymentServicesService],
})
export class PaymentServicesModule {}
