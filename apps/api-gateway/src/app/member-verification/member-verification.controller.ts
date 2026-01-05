import {
  Controller,
  Param,
  Inject,
  OnModuleInit,
  HttpStatus,
  Post,
  Patch,
  Body,
  Delete,
  HttpCode,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { CreateMemberVerificationDto } from './dto/create-member-verification.dto';
import { UpdateMemberVerificationDto } from './dto/update-member-verification.dto';
import {
  MEMBER_VERFICATION_PACKAGE_NAME,
  MemberVerificationServiceClient,
} from 'types/auth/member-verification';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  grpcToHttpStatus,
  Roles,
  RolesGuard,
  SessionAuthGuard,
  SessionData,
  CurrentSession,
} from '@in-job/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('Member-Verification')
@Controller('member-verification')
export class MemberVerificationController implements OnModuleInit {
  private memberSerice: MemberVerificationServiceClient;
  private cacheVersion = 'v1';

  constructor(
    @Inject(MEMBER_VERFICATION_PACKAGE_NAME)
    private memberVerificationClient: ClientGrpc,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  onModuleInit() {
    this.memberSerice =
      this.memberVerificationClient.getService<MemberVerificationServiceClient>(
        'MemberVerificationService'
      );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new member identity verification' })
  @ApiCreatedResponse({
    description: 'Member identity verification created successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({
    description: 'Identity verification already exists for this user',
  })
  @ApiBody({ type: CreateMemberVerificationDto })
  async create(
    @Body()
    createMemberIdentityVerificationDto: CreateMemberVerificationDto
  ) {
    try {
      const result = await firstValueFrom(
        this.memberSerice.upsertVerification({
          userId: createMemberIdentityVerificationDto.userId,
          passportPhoto: createMemberIdentityVerificationDto.passportPhoto,
          selfiePhoto: createMemberIdentityVerificationDto.selfiePhoto,
        })
      );
      await this.invalidateMemberCache();
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @Patch(':id')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Update member identity verification' })
  @ApiParam({ name: 'id', description: 'Verification record ID' })
  @ApiOkResponse({
    description: 'Member identity verification updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Member identity verification or verifier not found',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: UpdateMemberVerificationDto })
  async update(
    @Param('id') id: string,
    @Body()
    updateMemberIdentityVerificationDto: UpdateMemberVerificationDto,
    @CurrentSession() session: SessionData
  ) {
    try {
      const result = await firstValueFrom(
        this.memberSerice.updateVerification({
          id: id,
          passportPhoto: updateMemberIdentityVerificationDto.passportPhoto,
          selfiePhoto: updateMemberIdentityVerificationDto.selfiePhoto,
          verificationStatus:
            updateMemberIdentityVerificationDto.verificationStatus as any,
          isVerifiedBy: session.userId,
        })
      );

      await this.invalidateMemberCache();
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete member identity verification' })
  @ApiParam({ name: 'id', description: 'Verification record ID' })
  @ApiNoContentResponse({
    description: 'Member identity verification deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Member identity verification not found',
  })
  async remove(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.memberSerice.deleteVerification({ id })
      );
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  // Helper method to get cache version
  private async getCacheVersion(): Promise<string> {
    const version = await this.cacheManager.get<string>('member:version');
    if (!version) {
      await this.cacheManager.set('member:version', this.cacheVersion, 0);
      return this.cacheVersion;
    }
    return version;
  }

  // Helper method to invalidate all corporate-registration cache by incrementing version
  private async invalidateMemberCache(): Promise<void> {
    try {
      const newVersion = `v${Date.now()}`;
      await this.cacheManager.set('member:version', newVersion, 0);
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}
