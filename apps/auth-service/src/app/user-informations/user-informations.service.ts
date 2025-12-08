import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AuthPrismaService,
  PaginationResult,
  PaginationService,
} from '@in-job/common';
import { UserInformation } from 'generated/prisma-user';
import {
  AllUserInformationsWithMetaResponse,
  UserInformationResponse,
  DeleteUserInformationResponse,
  CreateUserInformationResponse,
} from 'types/auth/user-information';

@Injectable()
export class UserInformationsService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly paginationService: PaginationService
  ) {}

  private mapUserInformationToResponse(userInfo: UserInformation) {
    return {
      id: userInfo.id,
      userId: userInfo.userId,
      profileImage: userInfo.profileImage || undefined,
      gender: userInfo.gender || undefined,
      address: userInfo.address || undefined,
      country: userInfo.country || undefined,
      city: userInfo.city || undefined,
      cvForm: userInfo.cvForm || undefined,
      additionalInformation: userInfo.additionalInformation || undefined,
      createdAt: userInfo.createdAt.toISOString(),
      updatedAt: userInfo.updatedAt.toISOString(),
    };
  }

  async findAll(basicQuery: any): Promise<AllUserInformationsWithMetaResponse> {
    const searchColumn = ['id', 'userId', 'country', 'city', 'address'];

    const result = await this.paginationService.paginate<UserInformation>(
      basicQuery,
      this.prisma.userInformation,
      searchColumn,
      {}
    );

    const mappedData = (result as PaginationResult<UserInformation>)?.data.map(
      (userInfo) => this.mapUserInformationToResponse(userInfo)
    );

    return { data: mappedData, meta: result.meta };
  }

  async findOne(userId: string): Promise<UserInformationResponse> {
    const userInfo = await this.prisma.userInformation.findUnique({
      where: { userId },
    });

    if (!userInfo) {
      throw new NotFoundException(
        `User information for user ID ${userId} not found`
      );
    }

    return {
      success: true,
      message: 'User information retrieved successfully',
      userInformation: this.mapUserInformationToResponse(userInfo),
    };
  }

  async create(data: {
    userId: string;
    profileImage?: string;
    gender?: string;
    address?: string;
    country?: string;
    city?: string;
    cvForm?: string;
    additionalInformation?: string;
  }): Promise<CreateUserInformationResponse> {
    const userInfo = await this.prisma.userInformation.create({
      data: {
        userId: data.userId,
        profileImage: data.profileImage,
        gender: data.gender,
        address: data.address,
        country: data.country,
        city: data.city,
        cvForm: data.cvForm,
        additionalInformation: data.additionalInformation,
      },
    });

    return {
      success: true,
      message: 'User information created successfully',
    };
  }

  async update(
    userId: string,
    data: {
      userId?: string;
      profileImage?: string;
      gender?: string;
      address?: string;
      country?: string;
      city?: string;
      cvForm?: string;
      additionalInformation?: string;
    }
  ): Promise<CreateUserInformationResponse> {
    const existingUserInfo = await this.prisma.userInformation.findUnique({
      where: { userId },
    });

    if (!existingUserInfo) {
      throw new NotFoundException(
        `User information for user ID ${userId} not found`
      );
    }

    const updateData: Record<string, any> = {};

    if (data.profileImage !== undefined)
      updateData.profileImage = data.profileImage;
    if (data.gender !== undefined) updateData.gender = data.gender;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.country !== undefined) updateData.country = data.country;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.cvForm !== undefined) updateData.cvForm = data.cvForm;
    if (data.additionalInformation !== undefined)
      updateData.additionalInformation = data.additionalInformation;

    const userInfo = await this.prisma.userInformation.update({
      where: { userId },
      data: updateData,
    });

    return {
      success: true,
      message: 'User information updated successfully',
    };
  }

  async remove(userId: string): Promise<DeleteUserInformationResponse> {
    const existingUserInfo = await this.prisma.userInformation.findUnique({
      where: { userId },
    });

    if (!existingUserInfo) {
      throw new NotFoundException(
        `User information for user ID ${userId} not found`
      );
    }

    await this.prisma.userInformation.delete({
      where: { userId },
    });

    return {
      success: true,
      message: 'User information deleted successfully',
    };
  }
}
