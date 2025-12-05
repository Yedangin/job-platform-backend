import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInformationDto } from './dto/create-user-information.dto';
import { UpdateUserInformationDto } from './dto/update-user-information.dto';
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

  async create(
    createUserInformationDto: CreateUserInformationDto
  ): Promise<UserInformationResponse> {
    const userInfo = await this.prisma.userInformation.create({
      data: {
        userId: createUserInformationDto.userId,
        profileImage: createUserInformationDto.profileImage,
        gender: createUserInformationDto.gender,
        address: createUserInformationDto.address,
        country: createUserInformationDto.country,
        city: createUserInformationDto.city,
        cvForm: createUserInformationDto.cvForm,
        additionalInformation: createUserInformationDto.additionalInformation,
      },
    });

    return {
      success: true,
      message: 'User information created successfully',
      userInformation: this.mapUserInformationToResponse(userInfo),
    };
  }

  async update(
    userId: string,
    updateUserInformationDto: UpdateUserInformationDto
  ): Promise<UserInformationResponse> {
    const existingUserInfo = await this.prisma.userInformation.findUnique({
      where: { userId },
    });

    if (!existingUserInfo) {
      throw new NotFoundException(
        `User information for user ID ${userId} not found`
      );
    }

    const updateData: any = {};

    if (updateUserInformationDto.profileImage !== undefined)
      updateData.profileImage = updateUserInformationDto.profileImage;
    if (updateUserInformationDto.gender !== undefined)
      updateData.gender = updateUserInformationDto.gender;
    if (updateUserInformationDto.address !== undefined)
      updateData.address = updateUserInformationDto.address;
    if (updateUserInformationDto.country !== undefined)
      updateData.country = updateUserInformationDto.country;
    if (updateUserInformationDto.city !== undefined)
      updateData.city = updateUserInformationDto.city;
    if (updateUserInformationDto.cvForm !== undefined)
      updateData.cvForm = updateUserInformationDto.cvForm;
    if (updateUserInformationDto.additionalInformation !== undefined)
      updateData.additionalInformation =
        updateUserInformationDto.additionalInformation;

    const userInfo = await this.prisma.userInformation.update({
      where: { userId },
      data: updateData,
    });

    return {
      success: true,
      message: 'User information updated successfully',
      userInformation: this.mapUserInformationToResponse(userInfo),
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
