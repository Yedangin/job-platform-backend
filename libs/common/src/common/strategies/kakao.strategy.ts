import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthStrategyService } from '../services/auth-strategy.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private authService: AuthStrategyService) {
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
    const user = await this.authService.findOrCreateOAuthUser({
      email: profile._json?.kakao_account?.email,
      firstName: profile._json?.kakao_account?.profile?.nickname,
      lastName: undefined,
      picture: profile._json?.kakao_account?.profile?.profile_image_url,
      provider: 'kakao',
      providerId: profile.id,
    });

    return user;
  }
}
