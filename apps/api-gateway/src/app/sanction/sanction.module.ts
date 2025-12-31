import { Module } from '@nestjs/common';
import { SanctionController } from './sanction.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SANCTIONS_PACKAGE_NAME } from 'types/auth/sanction';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';
import { join } from 'path';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: SANCTIONS_PACKAGE_NAME,
          transport: Transport.GRPC,
          options: {
            package: [
              SANCTIONS_PACKAGE_NAME,
              COMMON_BASIC_QUERY_PACKAGE_NAME,
              COMMON_BASIC_USAGE_PACKAGE_NAME,
            ],
            protoPath: [
              join(process.cwd(), 'proto/auth/sanction.proto'),
              join(process.cwd(), 'proto/common/basic-query.proto'),
              join(process.cwd(), 'proto/common/basic.proto'),
            ],
            url: process.env.AUTH_SERVICE_URL || 'localhost:8001',
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
  controllers: [SanctionController],
})
export class SanctionModule {}
