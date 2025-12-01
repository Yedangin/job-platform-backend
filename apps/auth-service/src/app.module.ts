import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthPrismaModule } from 'libs/common/src';
import { MemberVerificationModule } from './member-verification/member-verification.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CorporateRegistrationModule } from './corporate-registration/corporate-registration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
      signOptions: { expiresIn: '15m' }, // Access token expires in 15 minutes
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT!) || 6379,
          },
          ttl: 10,
        }),
      }),
    }),
    AuthPrismaModule,
    AuthModule,
    MemberVerificationModule,
    UsersModule,
    CorporateRegistrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
