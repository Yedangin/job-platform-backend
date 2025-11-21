import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthPrismaService, RedisService } from 'libs/common/src';
import { GenerateStoreToken } from 'libs/common/src/common/helper/generate-store-token';

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
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService, AuthPrismaService, RedisService, GenerateStoreToken],
})
export class AuthServiceModule {}
