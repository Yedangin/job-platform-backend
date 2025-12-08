import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REVIEWS_PACKAGE_NAME } from 'types/job/review';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REVIEWS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            REVIEWS_PACKAGE_NAME,
            COMMON_BASIC_QUERY_PACKAGE_NAME,
            COMMON_BASIC_USAGE_PACKAGE_NAME,
          ],
          protoPath: [
            join(process.cwd(), 'proto/job/review.proto'),
            join(process.cwd(), 'proto/common/basic-query.proto'),
            join(process.cwd(), 'proto/common/basic.proto'),
          ],
          url: process.env.JOB_SERVICE_URL || 'localhost:8003',
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
  controllers: [ReviewController],
  providers: [],
})
export class ReviewModule {}
