import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRole, VerificationStatus } from 'generated/prisma-user';
import { AuthPrismaService, FileService } from '@in-job/common';
import {
  CreateCorporateRegistrationRequest,
  UpdateBusinessLicenseFileRequest,
  UpdateCoporateRegistrationReqeust,
} from 'types/auth/corporate-registration';

@Injectable()
export class CorporateRegistrationService {
  constructor(private prisma: AuthPrismaService, private fileService: FileService) {}

  async create(createDto: CreateCorporateRegistrationRequest) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createDto.userId} not found`);
    }

    // Check if corporate registration already exists for this user
    const existingRegistration =
      await this.prisma.corporateRegistration.findFirst({
        where: { userId: createDto.userId },
      });

    if (existingRegistration) {
      throw new ConflictException(
        'Corporate registration already exists for this user'
      );
    }

    return await this.prisma.corporateRegistration.create({
      data: {
        userId: createDto.userId,
        companyName: createDto.companyName,
        businessLicenseFile: createDto.businessLicenseFile,
      },
    });
  }

  async findOne(id: string) {
    const registration = await this.prisma.corporateRegistration.findUnique({
      where: { id },
    });

    if (!registration) {
      throw new NotFoundException(
        `Corporate registration with ID ${id} not found`
      );
    }

    return registration;
  }

  async update(updateDto: UpdateCoporateRegistrationReqeust) {
    try {
      const { id, ...dto } = updateDto;
      // Check if registration exists
      await this.findOne(id);

      // If verifier is being set, check if verifier exists
      if (updateDto.isVerifiedby) {
        const verifier = await this.prisma.user.findUnique({
          where: { id: updateDto.isVerifiedby },
        });

        if (!verifier) {
          throw new NotFoundException(
            `Verifier with ID ${updateDto.isVerifiedby} not found`
          );
        }
      }

      const corporate = await this.prisma.corporateRegistration.update({
        where: { id },
        data: {
          businessLicenseFile: updateDto.businessLicenseFile,
          companyName: updateDto.companyName,
          isVerifiedBy: updateDto.isVerifiedby,
          verificationStatus:
            (updateDto.verificationStatus as any) || VerificationStatus.PENDING,
        },
      });
      const userRole = await this.prisma.user.update({
        where: { id: corporate.userId },
        data: { role: UserRole.CORPORATE },
      });
      return corporate;
    } catch (error) {
      console.log('the error is : ', error);
    }
  }

  async updateBusinessLicense(data: UpdateBusinessLicenseFileRequest) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Get current user to check for existing profile image
        const user = await tx.corporateRegistration.findUnique({
          where: { id: data.id },
          select: {
            businessLicenseFile: true,
          },
        });

        if (!user) {
          throw new BadRequestException('User not found');
        }

        if (user.businessLicenseFile) {
          await this.fileService.deleteFile(user.businessLicenseFile);
        }

        // Update user
        await tx.corporateRegistration.update({
          where: { id: data.id },
          data: {
            businessLicenseFile: data.businessLicenseFile,
          },
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
        'Failed to update business license file'
      );
    }
  }

  async remove(id: string) {
    // Check if registration exists
    await this.findOne(id);

    return this.prisma.corporateRegistration.delete({
      where: { id },
    });
  }
}
