import { AuthPrismaModule, RedisModule } from '@in-job/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { MemberVerificationModule } from './member-verification/member-verification.module';
import { UsersModule } from './users/users.module';
import { UserInformationsModule } from './user-informations/user-informations.module';
import { CorporateRegistrationModule } from './corporate-registration/corporate-registration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
      signOptions: { expiresIn: '15m' }, // Access token expires in 15 minutes
    }),
    AuthPrismaModule,
    AuthModule,
    MemberVerificationModule,
    RedisModule,
    UsersModule,
    UserInformationsModule,
    CorporateRegistrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
