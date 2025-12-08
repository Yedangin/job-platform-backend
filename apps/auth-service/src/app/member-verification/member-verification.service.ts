import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthPrismaService } from '@in-job/common';
import {
  UpdateMemberVerificationRequest,
  UpsertMemberVerificationRequest,
} from 'types/auth/member-verification';
import { UserRole, VerificationStatus } from 'generated/prisma-user';

@Injectable()
export class MemberVerificationService {
  constructor(private readonly prisma: AuthPrismaService) {}
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
        'Identity verification already exists for this user',
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
        `Member identity verification with ID ${id} not found`,
      );
    }

    return verification;
  }

  async update(updateDto: UpdateMemberVerificationRequest) {
    const { id, ...dto } = updateDto;
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

    return this.prisma.memberIdentityVerification.update({
      where: { id },
      data: {
        passportPhoto: updateDto.passportPhoto,
        selfiePhoto: updateDto.selfiePhoto,
        isVerifiedBy: updateDto.isVerifiedby,
        verificationStatus:
          (updateDto.verificationStatus as any) || VerificationStatus.PENDING,
      },
    });
  }

  async remove(id: string) {
    // Check if verification exists
    await this.findOne(id);
    return this.prisma.memberIdentityVerification.delete({
      where: { id },
    });
  }
}
