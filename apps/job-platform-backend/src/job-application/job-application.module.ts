import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { NOTIFICATION_PACKAGE_NAME } from 'types/notification/notification';
import { COMMON_BASIC_QUERY_PACKAGE_NAME } from 'types/common/basic-query';
import { COMMON_BASIC_USAGE_PACKAGE_NAME } from 'types/common/basic';

// 알림 gRPC 클라이언트를 JobApplicationModule에 등록 (지원/상태변경 알림용)
// Register notification gRPC client in JobApplicationModule for apply/status-change notifications
@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            NOTIFICATION_PACKAGE_NAME,
            COMMON_BASIC_QUERY_PACKAGE_NAME,
            COMMON_BASIC_USAGE_PACKAGE_NAME,
          ],
          protoPath: [
            join(process.cwd(), 'proto/notification/notification.proto'),
            join(process.cwd(), 'proto/common/basic-query.proto'),
            join(process.cwd(), 'proto/common/basic.proto'),
          ],
          url: process.env.NOTIFICATION_SERVICE_URL || 'localhost:8004',
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
  controllers: [JobApplicationController],
  providers: [JobApplicationService, AuthPrismaService, RedisService],
  exports: [JobApplicationService],
})
export class JobApplicationModule {}
