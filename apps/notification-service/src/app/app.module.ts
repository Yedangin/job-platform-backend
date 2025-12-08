import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { NotificationPrismaModule, RedisModule } from '@in-job/common';

@Module({
  imports: [
    ConversationModule,
    NotificationModule,
    ChatModule,
    NotificationPrismaModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
