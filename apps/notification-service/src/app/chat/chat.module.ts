import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { RedisService } from '@in-job/common';

@Module({
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, RedisService],
  exports: [ChatService],
})
export class ChatModule {}
