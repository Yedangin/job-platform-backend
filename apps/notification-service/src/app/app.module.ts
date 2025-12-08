import { Module } from '@nestjs/common';
import { ConversationModule } from './conversation/conversation.module';
import { NotificationModule } from './notification/notification.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConversationModule, NotificationModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
