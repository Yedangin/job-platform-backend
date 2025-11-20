import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  RegisterRequest,
  LoginRequest,
  UserResponse,
  User,
  UserRole,
  UserStatus,
  RegisterSuccessResponse,
} from 'types/proto/auth/auth';
import { AuthPrismaService, RedisService, SessionData } from 'libs/common/src';

@Injectable()
export class AuthServiceService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly jwtService: JwtService,
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

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // Generate session ID (also as JWT for security)
    const sessionId = this.jwtService.sign(
      { sessionUuid: uuidv4(), userId: user.id },
      { expiresIn: '7d' },
    );

    // Store session data in Redis
    const sessionData: SessionData = {
      userId: user.id,
      email: user.email || '',
      role: user.role,
      accessToken,
      refreshToken,
    };

    // Store with 7 days TTL (same as refresh token)
    await this.redisService.set(
      `session:${sessionId}`,
      JSON.stringify(sessionData),
      7 * 24 * 60 * 60, // 7 days in seconds
    );

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
}
