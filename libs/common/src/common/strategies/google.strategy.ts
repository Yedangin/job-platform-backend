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
      // OAuth 콜백은 프론트엔드(CLIENT_URL)를 경유 → 프록시가 백엔드로 전달
      // OAuth callback routes through frontend (CLIENT_URL) → proxy forwards to backend
      callbackURL: `${process.env.CLIENT_URL || 'http://localhost:3000'}/api/auth/google/callback`,
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
