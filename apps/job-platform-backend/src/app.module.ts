import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import {
  RedisModule,
  SessionAuthGuard,
  SuccessTransformInterceptor,
  ThrottlerBehindProxyGuard,
} from 'libs/common/src';
import { AuthModule } from './auth/auth.module';
import { MemberVerificationModule } from './member-verification/member-verification.module';
import { UsersModule } from './users/users.module';
import { UserInformationsModule } from './user-informations/user-informations.module';
import { CorporateRegistrationModule } from './corporate-registration/corporate-registration.module';
import { ReportModule } from './report/report.module';
import { CategoryModule } from './category/category.module';
import { ApplyModule } from './apply/apply.module';
import { ProfileModule } from './profile/profile.module';
import { ScheduleModule } from '@nestjs/schedule';
import { VisaPolicyModule } from './visa-policy/visa-policy.module';
import { VisaRulesModule } from './visa-rules/visa-rules.module';
import { JobPostingModule } from './job-posting/job-posting.module';
import { JobPaymentModule } from './job-payment/job-payment.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { ResumeModule } from './resume/resume.module';
import { VisaVerificationModule } from './visa-verification/visa-verification.module';
import { LoggingModule } from './logging/logging.module';
import { LawAmendmentModule } from './law-amendment/law-amendment.module';
import { PaymentModule } from './payment/payment.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { AlbaVisaMatchingModule } from './alba-visa/alba-visa-matching.module';
import { FulltimeVisaModule } from './fulltime-visa/fulltime-visa.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { RequestLogInterceptor } from './logging/request-log.interceptor';
import { ErrorLogFilter } from './logging/error-log.filter';
import { NotificationModule } from './notification/notification.module';
import { InfoBoardModule } from './info-board/info-board.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
          },
          ttl: 300000, // 5 minutes default TTL
        }),
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          // 단기 버스트 제한 (10초 30회) / Short burst limit (30 req per 10s)
          // 이전 5/10s → 페이지 로드 시 동시 API 호출(auth+jobs+etc)만으로 429 발생
          // Previous 5/10s → concurrent API calls on page load (auth+jobs+etc) triggered 429
          name: 'short',
          ttl: 10000,
          limit: 30,
        },
        {
          // 분당 제한 (60초 100회) / Per-minute limit (100 req per 60s)
          // 이전 30/60s → 페이지 이동 시 빠르게 한계 도달
          // Previous 30/60s → limit reached quickly during navigation
          name: 'medium',
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    // ServeStaticModule 제거: 프론트엔드는 Next.js가 담당, 백엔드는 순수 API 서버
    // ServeStaticModule removed: frontend served by Next.js, backend is pure API server
    // 기존 설정의 경로가 Docker 빌드에서 불일치하여 ENOENT 에러 발생
    // Previous config path mismatched in Docker build, causing ENOENT errors
    JwtModule.register({
      global: true,
      // JWT_SECRET 미설정 시 서버 시작 실패 (하드코딩 폴백 금지)
      // Server fails to start if JWT_SECRET is not set (no hardcoded fallback)
      secret: (() => {
        const s = process.env.JWT_SECRET;
        if (!s)
          throw new Error(
            'JWT_SECRET 환경변수가 설정되지 않았습니다 / JWT_SECRET env var is required',
          );
        return s;
      })(),
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRES_IN || '2h' },
    }),
    AuthModule,
    MemberVerificationModule,
    UsersModule,
    UserInformationsModule,
    RedisModule,
    CorporateRegistrationModule,
    ReportModule,
    CategoryModule,
    ApplyModule,
    ProfileModule,
    VisaPolicyModule,
    VisaRulesModule,
    JobPostingModule,
    JobPaymentModule,
    JobApplicationModule,
    ResumeModule,
    VisaVerificationModule,
    LoggingModule,
    LawAmendmentModule,
    PaymentModule,
    DiagnosisModule,
    AlbaVisaMatchingModule,
    FulltimeVisaModule,
    InstitutionsModule,
    NotificationModule,
    InfoBoardModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    SessionAuthGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessTransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLogInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorLogFilter,
    },
  ],
})
export class AppModule {}
