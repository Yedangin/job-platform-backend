import {
  Controller,
  Get,
  Param,
  Inject,
  OnModuleInit,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateMemberVerificationDto } from './dto/create-member-verification.dto';
import { UpdateMemberVerificationDto } from './dto/update-member-verification.dto';
import {
  MEMBER_VERFICATION_PACKAGE_NAME,
  MemberVerificationServiceClient,
} from 'types/proto/auth/member-verification';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { grpcToHttpStatus } from 'libs/common/src';

@ApiTags('Member-Verification')
@Controller('member-verification')
export class MemberVerificationController implements OnModuleInit {
  private memberSerice: MemberVerificationServiceClient;
  constructor(
    @Inject(MEMBER_VERFICATION_PACKAGE_NAME)
    private memberVerificationClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.memberSerice =
      this.memberVerificationClient.getService<MemberVerificationServiceClient>(
        'MemberVerificationService',
      );
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Deleting member verification' })
  @ApiResponse({
    status: 201,
    description: 'Deleted Successfully',
  })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      console.log('the id: ', id);
      const result = await firstValueFrom(
        this.memberSerice.deleteVerification({ id }),
      );
      return result;
    } catch (error) {
      const httpStatus = error.code
        ? grpcToHttpStatus(error.code)
        : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        httpStatus,
      );
    }
  }
}
