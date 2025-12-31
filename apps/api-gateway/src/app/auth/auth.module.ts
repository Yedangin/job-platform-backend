import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  AppleStrategy,
  AuthPrismaService,
  FacebookStrategy,
  GoogleStrategy,
  KakaoStrategy,
  RedisService,
  RolesGuard,
  SessionAuthGuard,
  UserJwtStrategy,
} from '@in-job/common';
import { USER_INFORMATION_PACKAGE_NAME } from 'types/auth/user-information';
import { AUTH_PACKAGE_NAME } from 'types/auth/auth';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: [AUTH_PACKAGE_NAME, USER_INFORMATION_PACKAGE_NAME],
          protoPath: [
            join(process.cwd(), 'proto/auth/auth.proto'),
            join(process.cwd(), 'proto/auth/user-information.proto'),
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
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    KakaoStrategy,
    FacebookStrategy,
    AppleStrategy,
    UserJwtStrategy,
    AuthPrismaService,
    SessionAuthGuard,
    RolesGuard,
    RedisService,
  ],
})
export class AuthModule {}
