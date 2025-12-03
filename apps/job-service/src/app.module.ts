import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { ReportModule } from './report/report.module';
import { JobPrismaModule } from 'libs/common/src';
import { CategoryModule } from './category/category.module';
import { ApplyModule } from './apply/apply.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    JobPrismaModule,
    ReportModule,
    CategoryModule,
    ApplyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
