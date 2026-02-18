import { Module } from '@nestjs/common';
import { RedisPubService } from './redis-pub.service';

@Module({
  providers: [RedisPubService],
  exports: [RedisPubService],
})
export class RedisPubModule {}
