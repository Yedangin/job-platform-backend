import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload';
import { AuthPrismaService } from '../prisma/auth/auth-prisma.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private readonly prisma: AuthPrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Validating JWT payload:', payload);
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id, email: payload.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      role: user.userType,
      fullName: (user as any).fullName,
    };
  }
}
