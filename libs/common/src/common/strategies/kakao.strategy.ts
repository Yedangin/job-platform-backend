import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  private readonly logger = new Logger(KakaoStrategy.name);

  constructor(private configService: ConfigService) {
    super({
      clientID: process.env.KAKAO_AUTH_CLIENT_ID, // REST API Key
      clientSecret: process.env.KAKAO_AUTH_SECRET_KEY, // optional
      // OAuth 콜백은 프론트엔드(CLIENT_URL)를 경유 → 프록시가 백엔드로 전달
      // OAuth callback routes through frontend (CLIENT_URL) → proxy forwards to backend
      callbackURL: `${process.env.CLIENT_URL || 'http://localhost:3000'}/api/auth/kakao/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    try {
      this.logger.debug(
        `validate 호출됨 / validate called: profileId=${profile.id}`,
      );

      const user = {
        email: profile._json?.kakao_account?.email,
        firstName: profile._json?.kakao_account?.profile?.nickname,
        lastName: undefined,
        picture: profile._json?.kakao_account?.profile?.profile_image_url,
        provider: 'kakao',
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
