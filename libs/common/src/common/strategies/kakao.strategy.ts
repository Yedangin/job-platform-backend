import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
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
    const user = {
      email: profile._json?.kakao_account?.email,
      firstName: profile._json?.kakao_account?.profile?.nickname,
      lastName: undefined,
      picture: profile._json?.kakao_account?.profile?.profile_image_url,
      provider: 'kakao',
      providerId: profile.id,
    };

    return user;
  }
}
