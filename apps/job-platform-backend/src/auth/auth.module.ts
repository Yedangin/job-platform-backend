import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from 'types/proto/auth/auth';
import { join } from 'path';
import {
  AuthPrismaService,
  GoogleStrategy,
  UserJwtStrategy,
  SessionAuthGuard,
  RolesGuard,
  RedisService,
} from 'libs/common/src';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(process.cwd(), 'proto/auth/auth.proto'),
          url: process.env.AUTH_SERVICE_URL || 'localhost:8001',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    UserJwtStrategy,
    AuthPrismaService,
    SessionAuthGuard,
    RolesGuard,
    RedisService,
  ],
})
export class AuthModule {}
