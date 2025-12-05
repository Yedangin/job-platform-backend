import { Module } from '@nestjs/common';
import { UserInformationsService } from './user-informations.service';
import { UserInformationsController } from './user-informations.controller';
import { AuthPrismaService, PaginationService } from '@in-job/common';

@Module({
  controllers: [UserInformationsController],
  providers: [UserInformationsService, AuthPrismaService, PaginationService],
})
export class UserInformationsModule {}
