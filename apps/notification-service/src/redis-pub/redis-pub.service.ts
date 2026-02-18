import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisPubService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisPubService.name);
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT!) || 6379,
      },
    });

    this.client.on('error', (err) =>
      this.logger.error('Redis Publisher Error', err),
    );

    await this.client.connect();
    this.logger.log('Redis publisher connected');
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async publishNotification(
    userId: string,
    notification: Record<string, any>,
  ): Promise<void> {
    const channel = `notification:${userId}`;
    const message = JSON.stringify(notification);
    await this.client.publish(channel, message);
    this.logger.log(`Published notification to channel ${channel}`);
  }
}
