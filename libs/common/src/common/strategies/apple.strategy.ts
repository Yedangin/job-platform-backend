import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';
// import { AuthStrategyService } from '../services/auth-strategy.service';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(private configService: ConfigService) {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
      // OAuth 콜백은 프론트엔드(CLIENT_URL)를 경유 → 프록시가 백엔드로 전달
      // OAuth callback routes through frontend (CLIENT_URL) → proxy forwards to backend
      callbackURL: `${process.env.CLIENT_URL || 'http://localhost:3000'}/api/auth/apple/callback`,
      scope: ['name', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    idToken: any,
    profile: any,
  ): Promise<any> {
    const user = {
      email: profile.email,
      firstName: profile.name?.firstName,
      lastName: profile.name?.lastName,
      picture: undefined, // Apple doesn't provide profile pictures
      provider: 'apple',
      providerId: profile.id,
    };

    return user;
  }
}
