import { Module } from '@nestjs/common';
import { UserInformationsService } from './user-informations.service';
import { UserInformationsController } from './user-informations.controller';
import { AuthPrismaService, FileService, PaginationService } from '@in-job/common';

@Module({
  controllers: [UserInformationsController],
  providers: [UserInformationsService, AuthPrismaService, PaginationService, FileService],
})
export class UserInformationsModule {}
