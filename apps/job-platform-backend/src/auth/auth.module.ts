import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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
import { PaymentModule } from '../payment/payment.module';
import { AuthPlatformMiddleware } from './auth-platform.middleware';

@Module({
  imports: [PaymentModule],
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
export class AuthModule implements NestModule {
  /**
   * 소셜 로그인 초기 라우트에 미들웨어 등록
   * platform, userType 쿼리 파라미터를 쿠키에 저장
   *
   * Register middleware on initial OAuth routes to save
   * platform & userType query params as cookies
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthPlatformMiddleware)
      .forRoutes('auth/google', 'auth/kakao', 'auth/facebook', 'auth/apple');
  }
}
