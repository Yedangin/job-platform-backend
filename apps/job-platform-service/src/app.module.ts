import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { JobModule } from './module/job/job.module';
import { FileModule } from 'libs/common/src/common/file/file.module';
import { QueueModule } from './bull-queue/queue.module';
import { BullModule } from '@nestjs/bullmq';
import { bullmqConfig } from './config/bullmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: bullmqConfig,
      inject: [ConfigService],
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
    JobModule,
    FileModule,
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
