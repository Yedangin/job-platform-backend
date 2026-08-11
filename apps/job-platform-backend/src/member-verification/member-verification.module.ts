import { Module } from '@nestjs/common';
import { MemberVerificationController } from './member-verification.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MEMBER_VERFICATION_PACKAGE_NAME } from 'types/auth/member-verification';
import { join } from 'path';
import { RedisService, RolesGuard, SessionAuthGuard } from 'libs/common/src';
import { LegacyMemberVerificationDisabledGuard } from './legacy-member-verification-disabled.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MEMBER_VERFICATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: MEMBER_VERFICATION_PACKAGE_NAME,
          protoPath: join(
            process.cwd(),
            'proto/auth/member-verification.proto',
          ),
          url: process.env.AUTH_SERVICE_URL || 'localhost:8001',
        },
      },
    ]),
  ],
  controllers: [MemberVerificationController],
  providers: [
    LegacyMemberVerificationDisabledGuard,
    SessionAuthGuard,
    RolesGuard,
    RedisService,
  ],
})
export class MemberVerificationModule {}
