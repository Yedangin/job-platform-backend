import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CurrentSession,
  Roles,
  RolesGuard,
  SessionAuthGuard,
  SessionData,
  SkipCsrf,
} from 'libs/common/src';
import { CompleteIdentityVerificationDto } from './dto/complete-identity-verification.dto';
import { StartIdentityVerificationDto } from './dto/start-identity-verification.dto';
import { IdentityVerificationService } from './identity-verification.service';

@ApiTags('Identity Verification / 본인인증')
@Controller('identity-verifications')
export class IdentityVerificationController {
  constructor(private readonly service: IdentityVerificationService) {}

  @Get('config')
  @UseGuards(SessionAuthGuard)
  @ApiOperation({ summary: '본인인증 사용 가능 여부 / Identity availability' })
  getConfiguration() {
    return this.service.getConfiguration();
  }

  @Get('me')
  @UseGuards(SessionAuthGuard)
  @ApiOperation({ summary: '내 본인인증 상태 / My identity status' })
  getMyIdentity(@CurrentSession() session: SessionData) {
    return this.service.getVerifiedIdentitySummary(session.userId);
  }

  @Post('attempts')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('CORPORATE', 'ADMIN', 'SUPERADMIN')
  @Throttle({
    short: { ttl: 60_000, limit: 3 },
    medium: { ttl: 600_000, limit: 10 },
  })
  @ApiOperation({ summary: '본인인증 요청 생성 / Start identity verification' })
  start(
    @CurrentSession() session: SessionData,
    @Body() dto: StartIdentityVerificationDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent?: string,
  ) {
    return this.service.start(
      session.userId,
      dto,
      ipAddress,
      userAgent,
    );
  }

  @Post('bridge-config')
  @SkipCsrf()
  @Throttle({
    short: { ttl: 60_000, limit: 5 },
    medium: { ttl: 600_000, limit: 20 },
  })
  @ApiOperation({ summary: '앱 인증 브리지 구성 / Mobile bridge configuration' })
  getBridgeConfiguration(@Body() dto: CompleteIdentityVerificationDto) {
    return this.service.getBridgeConfiguration(dto);
  }

  @Post('complete')
  @SkipCsrf()
  @Throttle({
    short: { ttl: 60_000, limit: 5 },
    medium: { ttl: 600_000, limit: 20 },
  })
  @ApiOperation({ summary: '서버 본인인증 검증 / Verify identity server-side' })
  complete(@Body() dto: CompleteIdentityVerificationDto) {
    return this.service.complete(dto);
  }
}
