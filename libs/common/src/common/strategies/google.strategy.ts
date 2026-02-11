import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
      accessType: 'offline',
      prompt: 'consent', // 매번 동의 화면 표시 (테스트용)
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    try {
      console.log('[Google Strategy] validate 호출됨', {
        profileId: profile.id,
        email: profile.emails?.[0]?.value,
      });

      const user = {
        email: profile.emails?.[0]?.value,
        firstName: profile.name?.givenName,
        lastName: profile.name?.familyName,
        picture: profile.photos?.[0]?.value,
        provider: 'GOOGLE',
        providerId: String(profile.id), // ★ 숫자를 문자열로 변환
      };

      console.log('[Google Strategy] 유저 객체 생성 완료', user);

      return user;
    } catch (error) {
      console.error('[Google Strategy] 에러 발생', {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
