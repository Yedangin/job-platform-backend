import { Module } from '@nestjs/common';
import { RedisService } from 'libs/common/src';
import { GenerateStoreToken } from 'libs/common/src/common/helper/generate-store-token';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, RedisService, GenerateStoreToken],
})
export class AuthModule {}
