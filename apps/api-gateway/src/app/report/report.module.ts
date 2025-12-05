import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPORTS_PACKAGE_NAME } from 'types/job/report';
import { join } from 'path';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REPORTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            REPORTS_PACKAGE_NAME,
            COMMON_BASIC_QUERY_PACKAGE_NAME,
            COMMON_BASIC_USAGE_PACKAGE_NAME,
          ],
          protoPath: [
            join(process.cwd(), 'proto/job/report.proto'),
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
  controllers: [ReportController],
  providers: [],
})
export class ReportModule {}
