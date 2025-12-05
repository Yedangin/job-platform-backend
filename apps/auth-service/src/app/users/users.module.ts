import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthPrismaService, PaginationService } from '@in-job/common';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthPrismaService, PaginationService],
})
export class UsersModule {}
