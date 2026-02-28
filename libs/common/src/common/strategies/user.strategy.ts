import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/jwt-payload';
import { AuthPrismaService } from '../prisma/auth/auth-prisma.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  private readonly logger = new Logger(UserJwtStrategy.name);

  constructor(private readonly prisma: AuthPrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
    });
  }

  async validate(payload: JwtPayload) {
    this.logger.debug(
      `JWT payload 검증 중 / Validating JWT payload: userId=${payload.id}`,
    );
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
