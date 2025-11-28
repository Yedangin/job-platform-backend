import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  AuthPrismaService,
  PaginationResult,
  PaginationService,
} from 'libs/common/src';
import { User } from 'generated/prisma-user';
import {
  AllUsersWithMetaResponse,
  UserRole,
  UserStatus,
  UserResponse,
  DeleteUserResponse,
} from 'types/auth/users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly paginationService: PaginationService,
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

  private mapUserToResponse(user: User) {
    return {
      id: user.id,
      full_name: user?.fullName ?? undefined,
      email: user?.email ?? undefined,
      phone: user?.phone ?? undefined,
      status: this.mapUserStatus(user.status as string),
      role: this.mapUserRole(user.role as string),
      is_emailed_verified: user.isEmailedVerified,
      is_phone_verified: user.isPhoneVerified,
      walletId: user.walletId || undefined,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  }

  async findAll(basicQuery: any): Promise<AllUsersWithMetaResponse> {
    const searchColumn = ['id', 'fullName', 'email', 'phone', 'role'];

    const result = await this.paginationService.paginate<User>(
      basicQuery,
      this.prisma.user,
      searchColumn,
      {},
    );

    const mappedData = (result as PaginationResult<User>)?.data.map((user) =>
      this.mapUserToResponse(user),
    );

    return { data: mappedData, meta: result.meta };
  }

  async findOne(userId: string): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      success: true,
      message: 'User retrieved successfully',
      user: this.mapUserToResponse(user),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const hashedPassword = createUserDto.password
      ? await bcrypt.hash(createUserDto.password, 10)
      : undefined;

    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        phone: createUserDto.phone,
        fullName: createUserDto.fullName,
        password: hashedPassword,
        role: (createUserDto.role as any) || 'MEMBER',
        status: (createUserDto.status as any) || 'PENDING',
      },
    });

    return {
      success: true,
      message: 'User created successfully',
      user: this.mapUserToResponse(user),
    };
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const updateData: any = {};

    if (updateUserDto.email !== undefined)
      updateData.email = updateUserDto.email;
    if (updateUserDto.phone !== undefined)
      updateData.phone = updateUserDto.phone;
    if (updateUserDto.fullName !== undefined)
      updateData.fullName = updateUserDto.fullName;
    if (updateUserDto.role !== undefined) updateData.role = updateUserDto.role;
    if (updateUserDto.status !== undefined)
      updateData.status = updateUserDto.status;
    if (updateUserDto.password !== undefined) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      success: true,
      message: 'User updated successfully',
      user: this.mapUserToResponse(user),
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
