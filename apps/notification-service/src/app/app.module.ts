import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';
import { NotificationPrismaModule, RedisModule } from '@in-job/common';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConversationModule,
    NotificationModule,
    ChatModule,
    NotificationPrismaModule,
    RedisModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
