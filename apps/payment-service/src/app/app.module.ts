import {
  AuthPrismaModule,
  PaymentPrismaModule,
  RedisModule,
} from '@in-job/common';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DepositModule } from './deposit/deposit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
      signOptions: {
        expiresIn: '15m',
      },
    }),
    PaymentPrismaModule,
    AuthPrismaModule,
    RedisModule,
    DepositModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
