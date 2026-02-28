import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
      accessType: 'offline',
      prompt: 'consent', // 매번 동의 화면 표시 (테스트용) / Show consent every time (for testing)
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    try {
      this.logger.debug(
        `validate 호출됨 / validate called: profileId=${profile.id}, email=${profile.emails?.[0]?.value}`,
      );

      const user = {
        email: profile.emails?.[0]?.value,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        picture: profile.photos?.[0]?.value,
        provider: 'GOOGLE',
        providerId: String(profile.id), // ★ 숫자를 문자열로 변환 / Convert number to string
      };

      this.logger.debug(
        `유저 객체 생성 완료 / User object created: email=${user.email}`,
      );

      return user;
    } catch (error) {
      this.logger.error(
        `에러 발생 / Error occurred: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
