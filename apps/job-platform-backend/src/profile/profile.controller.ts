import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Session } from 'libs/common/src';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('my/dashboard-stats')
  @ApiOperation({ summary: 'Get dashboard stats for current user' })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved.' })
  async getMyDashboardStats(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.profileService.getMyDashboardStats(sessionId);
  }

  @Get('my/applications')
  @ApiOperation({ summary: 'Get my job applications' })
  @ApiResponse({ status: 200, description: 'Applications retrieved.' })
  async getMyApplications(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.profileService.getMyApplications(sessionId);
  }

  @Get('my/interviews')
  @ApiOperation({ summary: 'Get my interview schedules' })
  @ApiResponse({ status: 200, description: 'Interviews retrieved.' })
  async getMyInterviews(@Session() sessionId: string) {
    if (!sessionId) throw new UnauthorizedException('No session provided');
    return await this.profileService.getMyInterviews(sessionId);
  }
}
