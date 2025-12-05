import { Module } from '@nestjs/common';
import { ApplyController } from './apply.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APPLIES_PACKAGE_NAME } from 'types/job/apply';
import { join } from 'path';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: APPLIES_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            APPLIES_PACKAGE_NAME,
            COMMON_BASIC_QUERY_PACKAGE_NAME,
            COMMON_BASIC_USAGE_PACKAGE_NAME,
          ],
          protoPath: [
            join(process.cwd(), 'proto/job/apply.proto'),
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
  controllers: [ApplyController],
})
export class ApplyModule {}
