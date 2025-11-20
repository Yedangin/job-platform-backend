import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  OnModuleInit,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AUTH_PACKAGE_NAME, AuthServiceClient } from 'types/proto/auth/auth';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

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

    console.log('the result : ', result);
    const sessionId = result.sessionId;

    res.cookie('sessionId', sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 2 * 60 * 60 * 1000,
    });

    return { message: 'Login successful' };
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  })
  async getProfile(@Req() req: Request) {
    try {
      // TODO: Forward cookies to gRPC service via metadata
      // This requires custom gRPC interceptor or middleware

      const result = await firstValueFrom(this.authService.getProfile({}));
      return result;
    } catch (error) {
      throw error;
    }
  }

  // @Post('logout')
  // @ApiOperation({ summary: 'Logout current user' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Logout successful. Session cookie cleared.',
  // })
  // async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //   try {
  //     // TODO: Forward cookies to gRPC service via metadata
  //     // This requires custom gRPC interceptor or middleware

  //     const result = await firstValueFrom(this.authService.logout({}));

  //     // TODO: Clear session cookie
  //     // res.clearCookie('sessionId');

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
