import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServicesController } from './payment-services.controller';
import { PaymentServicesService } from './payment-services.service';

describe('PaymentServicesController', () => {
  let paymentServicesController: PaymentServicesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentServicesController],
      providers: [PaymentServicesService],
    }).compile();

    paymentServicesController = app.get<PaymentServicesController>(
      PaymentServicesController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(paymentServicesController.getHello()).toBe('Hello World!');
    });
  });
});
