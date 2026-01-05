import { CacheModule } from '@nestjs/cache-manager';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import {
  GrpcMetadataInterceptor,
  RedisModule,
  LoggingMiddleware,
  LogPrismaModule,
} from '@in-job/common';
import { MemberVerificationModule } from './member-verification/member-verification.module';
import { UsersModule } from './users/users.module';
import { UserInformationsModule } from './user-informations/user-informations.module';
import { CorporateRegistrationModule } from './corporate-registration/corporate-registration.module';
import { ReportModule } from './report/report.module';
import { CategoryModule } from './category/category.module';
import { JobPostModule } from './job-post/job-post.module';
import { ApplyModule } from './apply/apply.module';
import { InterviewModule } from './interview/interview.module';
import { ReviewModule } from './review/review.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PaymentModule } from './payment/payment.module';
import { SanctionModule } from './sanction/sanction.module';

@Module({
  imports: [
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
      rootPath: 'public',
      serveRoot: '/public',
      exclude: ['/api-docs', '/health'],
    }),
    ServeStaticModule.forRoot({
      rootPath: 'uploads',
      serveRoot: '/uploads',
      exclude: ['/api-docs', '/health'],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'thisismyJwtSecretKey',
      signOptions: {
        expiresIn: parseInt(process.env.JWT_SECRET_EXPIRES_IN || '3600'),
      },
    }),
    AuthModule,
    MemberVerificationModule,
    UsersModule,
    UserInformationsModule,
    RedisModule,
    CorporateRegistrationModule,
    ReportModule,
    CategoryModule,
    JobPostModule,
    ApplyModule,
    InterviewModule,
    ReviewModule,
    PaymentModule,
    SanctionModule,
    LogPrismaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcMetadataInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes(
      {
        path: 'auth/login',
        method: RequestMethod.POST,
      },
      {
        path: 'auth/register',
        method: RequestMethod.POST,
      },
      {
        path: '/payments/deposit/create',
        method: RequestMethod.POST,
      },
      {
        path: '/payments/deposit/confirm',
        method: RequestMethod.POST,
      },
      {
        path: '/payments/deposit/fail',
        method: RequestMethod.POST,
      }
    );
  }
}
