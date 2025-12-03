import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
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
import { JobPostModule } from './job-post/job-post.module';

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
    JobPostModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    SessionAuthGuard,
  ],
})
export class AppModule {}
