import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole, VerificationStatus } from 'generated/prisma-user';
import { AuthPrismaService } from 'libs/common/src';
import {
  CreateCorporateRegistrationRequest,
  UpdateCoporateRegistrationReqeust,
} from 'types/auth/corporate-registration';

@Injectable()
export class CorporateRegistrationService {
  constructor(private prisma: AuthPrismaService) {}

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
        'Corporate registration already exists for this user',
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
        `Corporate registration with ID ${id} not found`,
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
            `Verifier with ID ${updateDto.isVerifiedby} not found`,
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
  async remove(id: string) {
    // Check if registration exists
    await this.findOne(id);

    return this.prisma.corporateRegistration.delete({
      where: { id },
    });
  }
}
