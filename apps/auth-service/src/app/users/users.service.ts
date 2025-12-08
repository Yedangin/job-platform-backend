import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AuthPrismaService,
  PaginationResult,
  PaginationService,
} from '@in-job/common';
import { User } from 'generated/prisma-user';
import {
  AllUsersWithMetaResponse,
  UserRole,
  UserStatus,
  UserResponse,
  DeleteUserResponse,
  CreateUserResponse,
} from 'types/auth/users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly paginationService: PaginationService
  ) {}

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
      SUSPENDED: UserStatus.SUSPENDED,
      REJECTED: UserStatus.REJECTED,
    };
    return statusMap[status] || UserStatus.USER_STATUS_UNSPECIFIED;
  }

  private mapUserToResponse(
    user: User & {
      memberIdentityVerification?: any;
      userInformation?: any;
      corporateRegistration?: any;
    }
  ) {
    return {
      id: user.id,
      full_name: user?.fullName ?? undefined,
      email: user?.email ?? undefined,
      phone: user?.phone ?? undefined,
      status: this.mapUserStatus(user.status as string),
      role: this.mapUserRole(user.role as string),
      isEmailedVerified: user.isEmailedVerified,
      isPhoneVerified: user.isPhoneVerified,
      walletId: user.walletId || undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      memberIdentityVerification: user.memberIdentityVerification,
      userInformation: user?.userInformation,
      corporateRegistration: user.corporateRegistration,
    };
  }

  async findAll(basicQuery: any): Promise<AllUsersWithMetaResponse> {
    const searchColumn = ['id', 'fullName', 'email', 'phone', 'role'];

    const result = await this.paginationService.paginate<User>(
      basicQuery,
      this.prisma.user,
      searchColumn,
      {
        userInformation: true,
        corporateRegistration: true,
        memberIdentityVerification: true,
      }
    );

    const mappedData = (result as PaginationResult<User>)?.data.map((user) =>
      this.mapUserToResponse(user)
    );

    return { data: mappedData, meta: result.meta };
  }

  async findOne(userId: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userInformation: true,
        corporateRegistration: true,
        memberIdentityVerification: true,
      },
    });

    console.log('the user : ', user);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      success: true,
      message: 'User retrieved successfully',
      user: this.mapUserToResponse(user),
    };
  }

  private mapProtoRoleToString(role?: UserRole): string {
    const roleMap: Record<UserRole, string> = {
      [UserRole.GUEST]: 'GUEST',
      [UserRole.MEMBER]: 'MEMBER',
      [UserRole.CORPORATE]: 'CORPORATE',
      [UserRole.ADMIN]: 'ADMIN',
      [UserRole.SUPERADMIN]: 'SUPERADMIN',
      [UserRole.USER_ROLE_UNSPECIFIED]: 'MEMBER',
      [UserRole.UNRECOGNIZED]: 'MEMBER',
    };
    return role !== undefined ? roleMap[role] || 'MEMBER' : 'MEMBER';
  }

  private mapProtoStatusToString(status?: UserStatus): string {
    const statusMap: Record<UserStatus, string> = {
      [UserStatus.PENDING]: 'PENDING',
      [UserStatus.ACTIVE]: 'ACTIVE',
      [UserStatus.INACTIVE]: 'INACTIVE',
      [UserStatus.SUSPENDED]: 'SUSPENDED',
      [UserStatus.REJECTED]: 'REJECTED',
      [UserStatus.USER_STATUS_UNSPECIFIED]: 'PENDING',
      [UserStatus.UNRECOGNIZED]: 'PENDING',
    };
    return status !== undefined ? statusMap[status] || 'PENDING' : 'PENDING';
  }

  async create(data: {
    email?: string;
    phone?: string;
    fullName?: string;
    password?: string;
    role?: UserRole;
    status?: UserStatus;
  }): Promise<CreateUserResponse> {
    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : undefined;

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        fullName: data.fullName,
        password: hashedPassword,
        role: this.mapProtoRoleToString(data.role) as any,
        status: this.mapProtoStatusToString(data.status) as any,
      },
    });

    return {
      success: true,
      message: 'User created successfully',
    };
  }

  async update(
    userId: string,
    data: {
      email?: string;
      phone?: string;
      fullName?: string;
      password?: string;
      role?: UserRole;
      status?: UserStatus;
    }
  ): Promise<CreateUserResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updateData: Record<string, any> = {};

    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.fullName !== undefined) updateData.fullName = data.fullName;
    if (data.role !== undefined)
      updateData.role = this.mapProtoRoleToString(data.role);
    if (data.status !== undefined)
      updateData.status = this.mapProtoStatusToString(data.status);
    if (data.password !== undefined) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  }

  async remove(userId: string): Promise<DeleteUserResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }
}
