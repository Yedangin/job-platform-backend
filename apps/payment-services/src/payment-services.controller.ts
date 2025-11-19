import { Controller, Get } from '@nestjs/common';
import { PaymentServicesService } from './payment-services.service';

@Controller()
export class PaymentServicesController {
  constructor(
    private readonly paymentServicesService: PaymentServicesService,
  ) {}

  @Get()
  getHello(): string {
    return this.paymentServicesService.getHello();
  }
}
