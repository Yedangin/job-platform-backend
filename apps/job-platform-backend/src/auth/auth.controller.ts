import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  OnModuleInit,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AUTH_PACKAGE_NAME, AuthServiceClient } from 'types/proto/auth/auth';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { Session } from 'libs/common/src';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private authClient: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>('AuthService');
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
  })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await firstValueFrom(
        this.authService.register(registerDto),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        error.details ?? 'Internal server error',
        error.code ?? 500,
      );
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful. Session cookie set.',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result: any = await firstValueFrom(this.authService.login(loginDto));

    const sessionId = String(result.sessionId);

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || 'localhost',
    });

    return { message: 'Login successful' };
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  async getProfile(@Session() sessionId: string) {
    try {
      if (!sessionId) {
        throw new UnauthorizedException('Invalid or expired session');
      }

      const result = await firstValueFrom(
        this.authService.getProfile({ sessionId: sessionId }),
      );
      return result;
    } catch (error) {
      throw new HttpException(
        error.details ?? 'Internal server error',
        error.code ?? 500,
      );
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout current user' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful. Session cookie cleared.',
  })
  async logout(
    @Session() sessionId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await firstValueFrom(
        this.authService.logout({ sessionId: sessionId }),
      );

      res.clearCookie('sessionId', {
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      });

      return result;
    } catch (error) {
      throw new HttpException(
        error.details ?? 'Internal server error',
        error.code ?? 500,
      );
    }
  }

  @Post('request-password-reset')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiBody({ type: RequestPasswordResetDto })
  async requestPasswordReset(@Body() { email }: RequestPasswordResetDto) {
    try {
      const result = await this.authService.passwordReset({ email });
      return result;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Internal server error',
        },
        error.status,
      );
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() { token, newPassword }: ResetPasswordDto) {
    try {
      await this.authService.resetPassword({ token, newPassword });
      return { message: 'Password has been reset successfully' };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message || 'Internal server error',
        },
        error.status,
      );
    }
  }

  // @Post('reset-password')
  // @ApiOperation({ summary: 'Reset password with token' })
  // @ApiBody({ type: ResetPasswordDto })
  // async resetPassword(@Body() { token, newPassword }: ResetPasswordDto) {
  //   await this.authService.resetPassword(token, newPassword);
  //   return { message: 'Password has been reset successfully' };
  // }
}
