import { BullRootModuleOptions } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const bullmqConfig = (
  configService: ConfigService,
): BullRootModuleOptions => {
  const logger = new Logger('BullMQ');

  const host = configService.getOrThrow<string>('REDIS_HOST_IP');
  const port = parseInt(
    configService.getOrThrow<string>('REDIS_PORT') || '6379',
    10,
  );
  const stage = configService.getOrThrow<string>('STAGE');

  const connection = {
    host,
    port,
    ...(stage === 'dev' && {
      password: configService.getOrThrow<string>('REDIS_PASSWORD'),
    }),
  };

  logger.log(`Connected to Redis at ${host}:${port} [stage: ${stage}]`);

  return { connection };
};
