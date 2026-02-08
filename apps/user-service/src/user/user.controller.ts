import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '../../../generated/prisma-user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // --- Individual Profile Endpoints ---

  @Post('individual')
  async createIndividualProfile(
    @Body() data: Prisma.ProfileIndividualCreateInput,
  ) {
    return this.userService.createIndividualProfile(data);
  }

  @Get('individual/:authId')
  async getIndividualProfile(@Param('authId', ParseIntPipe) authId: number) {
    // ParseIntPipe returns number, convert to BigInt
    return this.userService.getIndividualProfile(BigInt(authId));
  }

  // --- Career Endpoints ---

  @Post('individual/:individualId/careers')
  async addCareer(
    @Param('individualId', ParseIntPipe) individualId: number,
    @Body() data: Prisma.ProfileCareerCreateWithoutProfileIndividualInput,
  ) {
    return this.userService.addCareer(BigInt(individualId), data);
  }

  @Put('careers/:careerId')
  async updateCareer(
    @Param('careerId', ParseIntPipe) careerId: number,
    @Body() data: Prisma.ProfileCareerUpdateInput,
  ) {
    return this.userService.updateCareer(BigInt(careerId), data);
  }

  @Delete('careers/:careerId')
  async deleteCareer(@Param('careerId', ParseIntPipe) careerId: number) {
    return this.userService.deleteCareer(BigInt(careerId));
  }

  // --- Corporate Profile Endpoints ---

  @Post('corporate')
  async createCorporateProfile(
    @Body() data: Prisma.ProfileCorporateCreateInput,
  ) {
    return this.userService.createCorporateProfile(data);
  }

  @Get('corporate/:authId')
  async getCorporateProfile(@Param('authId', ParseIntPipe) authId: number) {
    return this.userService.getCorporateProfile(BigInt(authId));
  }
}
