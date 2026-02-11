import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  AuthPrismaService,
  GoogleStrategy,
  UserJwtStrategy,
  SessionAuthGuard,
  RolesGuard,
  RedisService,
} from 'libs/common/src';
import { KakaoStrategy } from 'libs/common/src/common/strategies/kakao.strategy';
import { FacebookStrategy } from 'libs/common/src/common/strategies/facebook.strategy';
import { AppleStrategy } from 'libs/common/src/common/strategies/apple.strategy';
import { GenerateStoreToken } from 'libs/common/src/common/helper/generate-store-token';
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    GenerateStoreToken,
    AuthService,
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
  exports: [AuthService],
})
export class AuthModule {}
