import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { PAYMENT_PACKAGE_NAME } from 'types/payment/payment';
import { join } from 'path';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { PaymentPrismaService } from '@in-job/common';
import { PaymentController } from './payment.controller';
import { COMMON_BASIC_RESPONSE_PACKAGE_NAME } from 'types/common/response';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            PAYMENT_PACKAGE_NAME,
            COMMON_BASIC_QUERY_PACKAGE_NAME,
            COMMON_BASIC_USAGE_PACKAGE_NAME,
            COMMON_BASIC_RESPONSE_PACKAGE_NAME,
          ],
          protoPath: [
            join(process.cwd(), 'proto/payment/payment.proto'),
            join(process.cwd(), 'proto/common/basic-query.proto'),
            join(process.cwd(), 'proto/common/basic.proto'),
            join(process.cwd(), 'proto/common/response.proto'),
          ],
          url: process.env.PAYMENT_SERVICE_URL || 'localhost:8005',
          loader: {
            includeDirs: [join(process.cwd(), 'proto')],
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            arrays: true,
            objects: true,
          },
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentPrismaService],
  exports: [],
})
export class PaymentModule {}
