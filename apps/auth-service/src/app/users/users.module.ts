import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  AuthPrismaService,
  PaginationService,
  GrpcAuthGuard,
  RedisService,
} from '@in-job/common';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthPrismaService,
    PaginationService,
    GrpcAuthGuard,
    RedisService,
  ],
})
export class UsersModule {}
