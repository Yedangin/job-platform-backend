import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
// import { v4 as uuidv4 } from 'uuid';
import {
  RegisterRequest,
  LoginRequest,
  UserResponse,
  User,
  UserRole,
  UserStatus,
  RegisterSuccessResponse,
  PasswordResetResponse,
  SocialProvider as ProtoSocialProvider,
} from 'types/auth/auth';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';
import {
  SocialProvider as PrismaSocialProvider,
  User as PrismaUser,
} from 'generated/prisma-user';
import { GenerateStoreToken } from 'libs/common/src/common/helper/generate-store-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly generateToken: GenerateStoreToken,
    private readonly redisService: RedisService,
  ) {}

  async register(request: RegisterRequest): Promise<RegisterSuccessResponse> {
    const { email, password, fullName, role } = request;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine user role
    let userRole = UserRole.GUEST;
    if (role) {
      const roleUpper = role.toUpperCase();
      if (roleUpper in UserRole) {
        userRole = UserRole[roleUpper as keyof typeof UserRole];
      }
    }

    // Create user
    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        role:
          userRole === UserRole.GUEST
            ? 'GUEST'
            : userRole === UserRole.MEMBER
              ? 'MEMBER'
              : userRole === UserRole.CORPORATE
                ? 'CORPORATE'
                : userRole === UserRole.ADMIN
                  ? 'ADMIN'
                  : userRole === UserRole.SUPERADMIN
                    ? 'SUPERADMIN'
                    : 'GUEST',
        status: 'PENDING',
        isEmailedVerified: false,
        isPhoneVerified: false,
      },
    });

    return {
      success: true,
      message: 'User registered successfully',
    };
  }

  async login(
    request: LoginRequest,
  ): Promise<{ success: boolean; sessionId: string; message: string }> {
    const { email, password } = request;

    // Find user
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const payload = { userId: user.id, email: user.email, role: user.role };

    const sessionId = await this.generateToken.generate(payload);

    return {
      success: true,
      sessionId,
      message: 'Login successful',
    };
  }

  async getProfile(sessionId: string): Promise<UserResponse> {
    // Retrieve session from Redis
    const sessionDataStr = await this.redisService.get(`session:${sessionId}`);

    if (!sessionDataStr) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    const sessionData = JSON.parse(sessionDataStr) as SessionData;

    // Fetch user from database
    const user = await this.prisma.user.findUnique({
      where: { id: sessionData.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Map Prisma user to proto User - ensure all values are plain types
    const protoUser: User = {
      id: user.id,
      role: this.mapUserRole(user.role),
      email: user.email || undefined,
      phone: user.phone || undefined,
      fullName: user.fullName || undefined,
      status: this.mapUserStatus(user.status),
      isEmailedVerified: user.isEmailedVerified,
      isPhoneVerified: user.isPhoneVerified,
      walletId: user.walletId || undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return {
      success: true,
      message: 'Profile retrieved successfully',
      user: protoUser,
    };
  }

  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.verificationToken.create({
      data: {
        userId: user.id,
        token,
        type: 'password_reset',
        expiresAt,
      },
    });

    // Implement your email sending logic here
    console.log(
      `Password reset link: http://yourapp.com/reset-password?token=${token}`,
    );
    return {
      message: `Password reset link: http://yourapp.com/reset-password?token=${token}`,
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const verificationToken = await this.prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'password_reset',
        expiresAt: { gt: new Date() },
        usedAt: null,
      },
    });

    if (!verificationToken) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [user, tokenUpdate] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: verificationToken.userId },
        data: { password: hashedPassword },
      }),
      this.prisma.verificationToken.update({
        where: { id: verificationToken.id },
        data: { usedAt: new Date() },
      }),
    ]);
    return { message: 'Password has been reset successfully' };
  }

  async logout(sessionId: string): Promise<RegisterSuccessResponse> {
    // Check if session exists
    const exists = await this.redisService.exists(`session:${sessionId}`);

    if (!exists) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    // Delete session from Redis
    await this.redisService.del(`session:${sessionId}`);

    return {
      success: true,
      message: 'Logout successful',
    };
  }

  async findOrCreateOAuthUser(profile: {
    email?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    provider: ProtoSocialProvider;
    providerId: string;
  }) {
    // Convert proto enum to Prisma enum
    const prismaProvider = this.mapProtoToPrismaSocialProvider(
      profile.provider,
    );
    // Check if OAuth account exists
    const existingSocialAuth = await this.prisma.socialAuth.findFirst({
      where: {
        provider: prismaProvider,
        providerId: profile.providerId,
      },
      include: { user: true },
    });

    if (existingSocialAuth) {
      // Generate session for existing user
      const payload = {
        userId: existingSocialAuth.user.id,
        email: existingSocialAuth.user.email,
        role: existingSocialAuth.user.role,
      };
      const sessionId = await this.generateToken.generate(payload);

      return {
        success: true,
        sessionId,
        message: 'Login successful',
      };
    }

    // Find or create user by email if provided
    let user: PrismaUser | null = null;
    if (profile.email) {
      user = await this.prisma.user.findFirst({
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
        email = `${prismaProvider}_${profile.providerId}_${timestamp}_${randomSuffix}@oauth.local`;

        // Ensure email is unique (very unlikely collision, but just in case)
        let emailExists = await this.prisma.user.findFirst({
          where: { email },
        });

        while (emailExists) {
          const newRandomSuffix = Math.random().toString(36).substring(2, 8);
          email = `${prismaProvider}_${profile.providerId}_${timestamp}_${newRandomSuffix}@oauth.local`;
          emailExists = await this.prisma.user.findFirst({
            where: { email },
          });
        }
      }

      user = await this.prisma.user.create({
        data: {
          email,
          fullName,
          role: 'GUEST',
          status: 'PENDING',
        },
      });
    }

    // Create OAuth connection
    if (!user) {
      throw new Error('Failed to create user');
    }

    await this.prisma.userInformation.create({
      data: {
        userId: user.id,
        profileImage: profile.picture || null,
      },
    });

    await this.prisma.socialAuth.create({
      data: {
        userId: user.id,
        provider: prismaProvider,
        providerId: profile.providerId,
      },
    });

    const payload = { userId: user.id, email: user.email, role: user.role };

    const sessionId = await this.generateToken.generate(payload);

    return {
      success: true,
      sessionId,
      message: 'Login successful',
    };
  }

  // async findOrCreateOAuthUser(profile: {
  //   email?: string;
  //   firstName?: string;
  //   lastName?: string;
  //   picture?: string;
  //   provider: SocialProvider;
  //   providerId: string;
  // }): Promise<PrismaUser> {
  //   // 1. CHECK FOR EXISTING SOCIAL ACCOUNT (Read-only, outside transaction)
  //   // Find the socialAuth record and eagerly load the associated User
  //   const existingSocialAuth: SocialAuthWithUser | null = await this.prisma.socialAuth.findFirst({
  //     where: {
  //       provider: profile.provider,
  //       providerId: profile.providerId,
  //     },
  //     include: { user: true },
  //   });

  //   if (existingSocialAuth) {
  //     return existingSocialAuth.user;
  //   }

  //   // 2. FIND OR CREATE USER BY EMAIL (Read-only check outside transaction)
  //   let user: PrismaUser | null = null;
  //   if (profile.email) {
  //     user = await this.prisma.user.findFirst({
  //       where: { email: profile.email },
  //     });
  //   }

  //   // 3. ATOMIC CREATION/LINKING (Starts transaction if modification is required)
  //   return this.prisma.$transaction(async (tx) => {
  //     // Use 'tx' (the transaction client) for all DB operations within this block

  //     // A. If user was not found by email or no email was provided, create a new user.
  //     if (!user) {
  //       const fullName =
  //         [profile.firstName, profile.lastName].filter(Boolean).join(' ') || null;

  //       // Generate unique email if not provided by OAuth provider
  //       let email = profile.email;
  //       if (!email) {
  //         const timestamp = Date.now();
  //         // The email uniqueness check loop is kept here. Since this is a read
  //         // (findFirst) and the subsequent create (tx.user.create) is inside the
  //         // transaction, the risk of a race condition leading to a constraint violation
  //         // is minimal, but the database constraint is the final safeguard.
  //         let emailExists = true;
  //         do {
  //           const randomSuffix = Math.random().toString(36).substring(2, 8);
  //           email = `${profile.provider}_${profile.providerId}_${timestamp}_${randomSuffix}@oauth.local`;
  //           emailExists = await tx.user.findFirst({ where: { email } }).then(Boolean);
  //         } while (emailExists);
  //       }

  //       // Create new user inside the transaction
  //       user = await tx.user.create({
  //         data: {
  //           email: email!, // Assert non-null after generation logic
  //           fullName,
  //           role: 'GUEST',
  //           status: 'PENDING',
  //         },
  //       });
  //     }

  //     // B. Create OAuth connection and User Information for the (new or existing) user

  //     // Create User Information (e.g., profile picture)
  //     await tx.userInformation.create({
  //       data: {
  //         userId: user.id,
  //         profileImage: profile.picture || null,
  //       },
  //     });

  //     // Create SocialAuth record (linking the social provider to the user)
  //     await tx.socialAuth.create({
  //       data: {
  //         userId: user.id,
  //         provider: profile.provider,
  //         providerId: profile.providerId,
  //       },
  //     });

  //     // Return the user object
  //     return user;
  //   });
  // }

  private mapUserRole(role: string): UserRole {
    const roleMap: Record<string, UserRole> = {
      GUEST: UserRole.GUEST,
      MEMBER: UserRole.MEMBER,
      CORPORATE: UserRole.CORPORATE,
      ADMIN: UserRole.ADMIN,
      SUPERADMIN: UserRole.SUPERADMIN,
    };
    return roleMap[role] || UserRole.USER_ROLE_UNSPECIFIED;
  }

  private mapUserStatus(status: string): UserStatus {
    const statusMap: Record<string, UserStatus> = {
      PENDING: UserStatus.PENDING,
      ACTIVE: UserStatus.ACTIVE,
      INACTIVE: UserStatus.INACTIVE,
      SUSPENDED: UserStatus.INACTIVE,
      REJECTED: UserStatus.INACTIVE,
    };
    return statusMap[status] || UserStatus.USER_STATUS_UNSPECIFIED;
  }

  private mapProtoToPrismaSocialProvider(
    protoProvider: ProtoSocialProvider,
  ): PrismaSocialProvider {
    const providerMap: Record<ProtoSocialProvider, PrismaSocialProvider> = {
      [ProtoSocialProvider.GOOGLE]: 'GOOGLE' as PrismaSocialProvider,
      [ProtoSocialProvider.FACEBOOK]: 'FACEBOOK' as PrismaSocialProvider,
      [ProtoSocialProvider.KAKAO]: 'KAKAO' as PrismaSocialProvider,
      [ProtoSocialProvider.APPLE]: 'APPLE' as PrismaSocialProvider,
      [ProtoSocialProvider.UNRECOGNIZED]: 'GOOGLE' as PrismaSocialProvider, // Default fallback
    };
    return providerMap[protoProvider] || ('GOOGLE' as PrismaSocialProvider);
  }
}
