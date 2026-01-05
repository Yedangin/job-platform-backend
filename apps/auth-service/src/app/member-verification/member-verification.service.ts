import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthPrismaService, FileService } from '@in-job/common';
import {
  FileType,
  SuccessResponse,
  UpdateMemberVerificationRequest,
  UpdatePhotoRequest,
  UpsertMemberVerificationRequest,
} from 'types/auth/member-verification';
import { UserRole, VerificationStatus } from 'generated/prisma-user';

@Injectable()
export class MemberVerificationService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private fileService: FileService
  ) {}
  async create(createDto: UpsertMemberVerificationRequest) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createDto.userId} not found`);
    }

    // Check if verification already exists for this user
    const existingVerification =
      await this.prisma.memberIdentityVerification.findFirst({
        where: { userId: createDto.userId },
      });

    if (existingVerification) {
      throw new ConflictException(
        'Identity verification already exists for this user'
      );
    }

    const verify = await this.prisma.memberIdentityVerification.create({
      data: {
        userId: createDto.userId,
        passportPhoto: createDto.passportPhoto,
        selfiePhoto: createDto.selfiePhoto,
      },
    }); 

    const userRole = await this.prisma.user.update({
      where: { id: createDto.userId },
      data: { role: UserRole.MEMBER },
    });
    return verify;
  }

  async findOne(id: string) {
    const verification =
      await this.prisma.memberIdentityVerification.findUnique({
        where: { id },
      });

    if (!verification) {
      throw new NotFoundException(
        `Member identity verification with ID ${id} not found`
      );
    }

    return verification;
  }

  async update(updateDto: UpdateMemberVerificationRequest) {
    const { id, ...dto } = updateDto;
    await this.findOne(id);
    // If verifier is being set, check if verifier exists
    if (updateDto.isVerifiedBy) {
      const verifier = await this.prisma.user.findUnique({
        where: { id: updateDto.isVerifiedBy },
      });

      if (!verifier) {
        throw new NotFoundException(
          `Verifier with ID ${updateDto.isVerifiedBy} not found`
        );
      }
    }

    return this.prisma.memberIdentityVerification.update({
      where: { id },
      data: {
        passportPhoto: updateDto.passportPhoto,
        selfiePhoto: updateDto.selfiePhoto,
        isVerifiedBy: updateDto.isVerifiedBy,
        verificationStatus:
          (updateDto.verificationStatus as any) || VerificationStatus.PENDING,
      },
    });
  }

  async updateMemberPhoto(data: UpdatePhotoRequest): Promise<SuccessResponse> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Get current user to check for existing profile image
        const user = await tx.memberIdentityVerification.findUnique({
          where: { id: data.id },
          select: {
            passportPhoto: true,
            selfiePhoto: true,
          },
        });

        if (!user) {
          throw new BadRequestException('User not found');
        }

        let updateData: {
          passportPhoto?: string;
          selfiePhoto?: string;
        } = {};

        const fileTypeStr =
          typeof data.fileType === 'string'
            ? data.fileType
            : FileType[data.fileType];

        if (
          fileTypeStr === 'PASSPORT_PHOTO' ||
          data.fileType === FileType.PASSPORT_PHOTO
        ) {
          updateData.passportPhoto = data.fileUrl;
        } else if (
          fileTypeStr === 'SELFIE_PHOTO' ||
          data.fileType === FileType.SELFIE_PHOTO
        ) {
          updateData.selfiePhoto = data.fileUrl;
        } else {
          console.log('Unknown fileType:', data.fileType);
        }

        if (
          (fileTypeStr === 'PASSPORT_PHOTO' ||
            data.fileType === FileType.PASSPORT_PHOTO) &&
          user.passportPhoto
        ) {
          await this.fileService.deleteFile(user.passportPhoto);
        }

        if (
          (fileTypeStr === 'SELFIE_PHOTO' ||
            data.fileType === FileType.SELFIE_PHOTO) &&
          user.selfiePhoto
        ) {
          await this.fileService.deleteFile(user.selfiePhoto);
        }

        // Update user
        await tx.memberIdentityVerification.update({
          where: { id: data.id },
          data: updateData,
        });

        // No need to call tx.commit() - transaction auto-commits on successful completion
        return {
          message: 'File updated successfully',
        };
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to update profile picture'
      );
    }
  }

  async remove(id: string) {
    // Check if verification exists
    await this.findOne(id);
    return this.prisma.memberIdentityVerification.delete({
      where: { id },
    });
  }
}
