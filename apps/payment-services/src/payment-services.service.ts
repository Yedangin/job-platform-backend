import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentServicesService {
  getHello(): string {
    return 'Hello World!';
  }
}
