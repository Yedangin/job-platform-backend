import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '@app/common';

@Injectable()
export class AuthStrategyService {
  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email, isEmailVerified: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.passwordHash) {
      throw new UnauthorizedException('Account uses OAuth login');
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async findOrCreateOAuthUser(profile: {
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    provider: 'google' | 'facebook' | 'apple' | 'kakao';
    providerId: string;
  }) {
    // Check if OAuth account exists
    const existingSocialAuth = await this.prisma.socialAuth.findFirst({
      where: {
        provider: profile.provider,
        providerId: profile.providerId,
      },
      include: { user: true },
    });

    if (existingSocialAuth) {
      return existingSocialAuth.user;
    }

    // Find or create user by email if provided
    let user: User | null = null;
    if (profile.email) {
      user = await this.prisma.user.findUnique({
        where: { email: profile.email },
      });
    }

    if (!user) {
      // Create new user
      const fullName =
        [profile.firstName, profile.lastName].filter(Boolean).join(' ') || null;

      // Generate unique email if not provided by OAuth provider
      let email = profile.email;
      if (!email) {
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);
        email = `${profile.provider}_${profile.providerId}_${timestamp}_${randomSuffix}@oauth.local`;

        // Ensure email is unique (very unlikely collision, but just in case)
        let emailExists = await this.prisma.user.findUnique({
          where: { email },
        });

        while (emailExists) {
          const newRandomSuffix = Math.random().toString(36).substring(2, 8);
          email = `${profile.provider}_${profile.providerId}_${timestamp}_${newRandomSuffix}@oauth.local`;
          emailExists = await this.prisma.user.findUnique({
            where: { email },
          });
        }
      }

      user = await this.prisma.user.create({
        data: {
          email,
          fullName,
          profileImageUrl: profile.picture,
        },
      });
    }

    // Create OAuth connection
    if (!user) {
      throw new Error('Failed to create user');
    }

    await this.prisma.socialAuth.create({
      data: {
        userId: user.id,
        provider: profile.provider,
        providerId: profile.providerId,
      },
    });

    return user;
  }
}
