import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from 'src/common/strategies/google.strategy';
import { FacebookStrategy } from 'src/common/strategies/facebook.strategy';
import { LocalStrategy } from 'src/common/strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, FacebookStrategy, LocalStrategy],
})
export class AuthModule {}
