import { Module } from '@nestjs/common';
import { GenerateStoreToken, RedisService } from '@in-job/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, RedisService, GenerateStoreToken],
})
export class AuthModule {}
