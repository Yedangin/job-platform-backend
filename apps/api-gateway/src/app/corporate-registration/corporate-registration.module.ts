import { Module } from '@nestjs/common';
import { CorporateRegistrationController } from './corporate-registration.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CORPORATE_REGISTRATION_PACKAGE_NAME } from 'types/auth/corporate-registration';
import { join } from 'path';
import { COMMON_BASIC_RESPONSE_PACKAGE_NAME } from 'types/common/response';
import { FileService } from '@in-job/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CORPORATE_REGISTRATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [
            CORPORATE_REGISTRATION_PACKAGE_NAME,
            COMMON_BASIC_RESPONSE_PACKAGE_NAME,
          ],
          protoPath: [
            join(process.cwd(), 'proto/auth/corporate-registration.proto'),
            join(process.cwd(), 'proto/common/response.proto'),
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
  controllers: [CorporateRegistrationController],
  providers: [FileService],
})
export class CorporateRegistrationModule {}
