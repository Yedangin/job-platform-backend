import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import {
  RedisModule,
  SessionAuthGuard,
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
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'thisismyJwtSecretKey',
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRES_IN },
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
      useClass: RequestLogInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorLogFilter,
    },
  ],
})
export class AppModule {}
