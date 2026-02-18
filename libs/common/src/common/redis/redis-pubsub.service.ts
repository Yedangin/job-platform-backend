import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisPubSubService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisPubSubService.name);
  private publisher: RedisClientType;
  private subscriber: RedisClientType;

  async onModuleInit() {
    const redisConfig = {
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT!) || 6379,
      },
    };

    this.publisher = createClient(redisConfig);
    this.subscriber = createClient(redisConfig);

    this.publisher.on('error', (err) =>
      this.logger.error('Redis Publisher Error', err),
    );
    this.subscriber.on('error', (err) =>
      this.logger.error('Redis Subscriber Error', err),
    );

    await this.publisher.connect();
    await this.subscriber.connect();

    this.logger.log('Redis Pub/Sub connections established');
  }

  async onModuleDestroy() {
    await this.publisher.quit();
    await this.subscriber.quit();
  }

  async publish(channel: string, message: string): Promise<void> {
    await this.publisher.publish(channel, message);
  }

  async subscribe(
    channel: string,
    callback: (message: string, channel: string) => void,
  ): Promise<void> {
    await this.subscriber.subscribe(channel, callback);
  }

  async psubscribe(
    pattern: string,
    callback: (message: string, channel: string) => void,
  ): Promise<void> {
    await this.subscriber.pSubscribe(pattern, callback);
  }

  async unsubscribe(channel: string): Promise<void> {
    await this.subscriber.unsubscribe(channel);
  }
}
