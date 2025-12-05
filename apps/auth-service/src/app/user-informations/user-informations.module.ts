import { Module } from '@nestjs/common';
import { UserInformationsController } from './user-informations.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_INFORMATION_PACKAGE_NAME } from 'types/auth/user-information';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_INFORMATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            USER_INFORMATION_PACKAGE_NAME,
            'common.basic.query',
            'common.basic.usage',
          ],
          protoPath: [
            join(process.cwd(), 'proto/auth/user-information.proto'),
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
  controllers: [UserInformationsController],
  providers: [],
})
export class UserInformationsModule {}
