import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenResponseDto } from 'src/common/dto/token-response.dto';
import { User } from 'src/common/decorator/current-user.decorator';
import { RegisterDto } from './dto/register.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { GoogleOAuthGuard } from 'src/common/guard/google-oauth.guard';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  async login(@User() user) {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: TokenResponseDto })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async getProfile(@Req() req) {
    const user = await this.authService.getProfile(req.user.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Safely handle passwordHash removal
    const result = {
      ...user,
      passwordHash: undefined,
      roles: user.roles.map((userRole) => userRole.role.name),
    };
    delete result.passwordHash;

    return result;
  }

  // Add to auth.controller.ts
  @Post('request-password-reset')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiBody({ type: RequestPasswordResetDto })
  async requestPasswordReset(@Body() { email }: RequestPasswordResetDto) {
    await this.authService.requestPasswordReset(email);
    return { message: 'If an account exists, you will receive a reset email' };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() { token, newPassword }: ResetPasswordDto) {
    await this.authService.resetPassword(token, newPassword);
    return { message: 'Password has been reset successfully' };
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  async googleAuthRedirect(@User() user) {
    return this.authService.login(user);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Initiate Facebook OAuth login' })
  async facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  @ApiOperation({ summary: 'Facebook OAuth callback' })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  async facebookAuthRedirect(@User() user) {
    return this.authService.login(user);
  }
}
