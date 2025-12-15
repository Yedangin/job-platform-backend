import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USERS_PACKAGE_NAME } from 'types/auth/users';
import { GrpcMetadataStorage, GrpcClientInterceptor } from '@in-job/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            USERS_PACKAGE_NAME,
            'common.basic.query',
            'common.basic.usage',
          ],
          protoPath: [
            join(process.cwd(), 'proto/auth/users.proto'),
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
  controllers: [UsersController],
  providers: [
    GrpcMetadataStorage,
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcClientInterceptor,
    },
  ],
})
export class UsersModule {}
