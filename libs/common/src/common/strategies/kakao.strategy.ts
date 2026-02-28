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
      callbackURL: process.env.KAKAO_AUTH_CALLBACK_URL, // redirect URI
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
