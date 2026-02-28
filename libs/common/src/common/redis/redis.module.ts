import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisPubSubService } from './redis-pubsub.service';
import { RedisLockService } from './redis-lock.service';

@Global()
@Module({
  providers: [RedisService, RedisPubSubService, RedisLockService],
  exports: [RedisService, RedisPubSubService, RedisLockService],
})
export class RedisModule {}
