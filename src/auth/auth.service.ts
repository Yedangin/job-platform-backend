import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // First find the default role
    const defaultRole = await this.prisma.role.findFirst({
      where: { isDefault: true },
    });

    if (!defaultRole) {
      throw new Error('No default role found');
    }

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        passwordHash: hashedPassword,
        roles: {
          create: {
            roleId: defaultRole.id,
          },
        },
      },
      include: { roles: { include: { role: true } } },
    });

    const { passwordHash, ...result } = user;
    return result;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
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

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles.map((userRole) => userRole.role.name),
    };

    return {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: 3600,
    };
  }

  async findOrCreateOAuthUser(profile: {
    email: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    provider: string;
    providerId: string;
  }) {
    // Find the provider
    const provider = await this.prisma.oAuthProvider.findUnique({
      where: { name: profile.provider },
    });

    if (!provider) {
      throw new Error('Provider not found');
    }

    // Check if OAuth account exists
    const existingOAuth = await this.prisma.userOAuth.findFirst({
      where: {
        providerId: provider.id,
        providerUserId: profile.providerId,
      },
      include: { user: true },
    });

    if (existingOAuth) {
      return existingOAuth.user;
    }

    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      const defaultRole = await this.prisma.role.findFirst({
        where: { isDefault: true },
      });

      if (!defaultRole) {
        throw new Error('No default role found');
      }

      user = await this.prisma.user.create({
        data: {
          email: profile.email,
          isVerified: true,
          roles: {
            create: {
              roleId: defaultRole.id,
            },
          },
        },
      });
    }

    // Create OAuth connection
    await this.prisma.userOAuth.create({
      data: {
        userId: user.id,
        providerId: provider.id,
        providerUserId: profile.providerId,
        accessToken: '', // You might want to store this
      },
    });

    return user;
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { roles: { include: { role: true } } },
    });
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Don't reveal if user doesn't exist
      return;
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.verificationToken.create({
      data: {
        userId: user.id,
        token,
        tokenType: 'password_reset',
        expiresAt,
      },
    });

    // Implement your email sending logic here
    console.log(
      `Password reset link: http://yourapp.com/reset-password?token=${token}`,
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const verificationToken = await this.prisma.verificationToken.findFirst({
      where: {
        token,
        tokenType: 'password_reset',
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!verificationToken) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: verificationToken.userId },
        data: { passwordHash: hashedPassword },
      }),
      this.prisma.verificationToken.update({
        where: { id: verificationToken.id },
        data: { usedAt: new Date() },
      }),
    ]);
  }
}
