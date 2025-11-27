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
      callbackURL: process.env.APPLE_CALLBACK_URL,
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
