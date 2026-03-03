import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      // OAuth 콜백은 프론트엔드(CLIENT_URL)를 경유 → 프록시가 백엔드로 전달
      // OAuth callback routes through frontend (CLIENT_URL) → proxy forwards to backend
      callbackURL: `${process.env.CLIENT_URL || 'http://localhost:3000'}/api/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name'],
      passReqToCallback: false, // Explicitly set this
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const user = {
      email: profile.emails?.[0]?.value,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      picture: profile.photos?.[0]?.value,
      provider: 'facebook',
      providerId: profile.id,
    };

    return user;
  }
}
