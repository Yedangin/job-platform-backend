import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  OnModuleInit,
  Post,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AUTH_PACKAGE_NAME,
  AuthServiceClient,
  SocialProvider,
} from 'types/auth/auth';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import {
  GoogleOAuthGuard,
  Session,
  SessionAuthGuard,
  RolesGuard,
  Roles,
  Facebook0AuthGuard,
  KakaoAuthGuard,
  Apple0AuthGuard,
} from 'libs/common/src';

// Helper function to map gRPC status codes to HTTP status codes
function grpcToHttpStatus(grpcCode: number): number {
  const statusMap: Record<number, number> = {
    0: HttpStatus.OK, // OK
    1: HttpStatus.INTERNAL_SERVER_ERROR, // CANCELLED
    2: HttpStatus.INTERNAL_SERVER_ERROR, // UNKNOWN
    3: HttpStatus.BAD_REQUEST, // INVALID_ARGUMENT
    4: HttpStatus.REQUEST_TIMEOUT, // DEADLINE_EXCEEDED
    5: HttpStatus.NOT_FOUND, // NOT_FOUND
    6: HttpStatus.CONFLICT, // ALREADY_EXISTS
    7: HttpStatus.FORBIDDEN, // PERMISSION_DENIED
    8: HttpStatus.TOO_MANY_REQUESTS, // RESOURCE_EXHAUSTED
    9: HttpStatus.BAD_REQUEST, // FAILED_PRECONDITION
    10: HttpStatus.CONFLICT, // ABORTED
    11: HttpStatus.BAD_REQUEST, // OUT_OF_RANGE
    12: HttpStatus.NOT_IMPLEMENTED, // UNIMPLEMENTED
    13: HttpStatus.INTERNAL_SERVER_ERROR, // INTERNAL
    14: HttpStatus.SERVICE_UNAVAILABLE, // UNAVAILABLE
    15: HttpStatus.INTERNAL_SERVER_ERROR, // DATA_LOSS
    16: HttpStatus.UNAUTHORIZED, // UNAUTHENTICATED
  };
  return statusMap[grpcCode] ?? HttpStatus.INTERNAL_SERVER_ERROR;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_PACKAGE_NAME) private authClient: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>('AuthService');
  }

  @Get()
  @UseGuards(SessionAuthGuard)
  getHello(): string {
    return 'Auth Service is running';
  }

  @Get('admin')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Admin only endpoint (example)' })
  @ApiResponse({
    status: 200,
    description: 'Access granted for admin users.',
  })
  getAdminData(): string {
    return 'This is admin-only data';
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
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
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
    try {
      const result: any = await firstValueFrom(
        this.authService.login(loginDto),
      );

      const sessionId = String(result.sessionId);

      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      });

      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
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
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
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
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @Post('request-password-reset')
  @ApiOperation({ summary: 'Request password reset email' })
  @ApiBody({ type: RequestPasswordResetDto })
  async requestPasswordReset(@Body() { email }: RequestPasswordResetDto) {
    try {
      const result = await firstValueFrom(
        this.authService.passwordReset({ email }),
      );
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() { token, newPassword }: ResetPasswordDto) {
    try {
      const result = await firstValueFrom(
        this.authService.resetPassword({
          token,
          newPassword,
        }),
      );
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Initiate Google OAuth login' })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
        provider: SocialProvider.GOOGLE,
        providerId: req.user.providerId,
      };

      const result = await firstValueFrom(this.authService.socialLogin(user));

      res.cookie('sessionId', result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      });

      return res.redirect('http://jobchaja.com');
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @Get('facebook')
  @UseGuards(Facebook0AuthGuard)
  @ApiOperation({ summary: 'Initiate Facebook OAuth login' })
  async facebookAuth() {}

  @Get('facebook/callback')
  @UseGuards(Facebook0AuthGuard)
  @ApiOperation({ summary: 'Facebook OAuth callback' })
  async facebookAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
        provider: SocialProvider.GOOGLE,
        providerId: req.user.providerId,
      };

      const result = await firstValueFrom(this.authService.socialLogin(user));

      res.cookie('sessionId', result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      });

      return res.redirect('http://jobchaja.com');
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: 'Initiate Kakao OAuth login' })
  async kakaoAuth() {}

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: 'Kakao OAuth callback' })
  async kakaoOAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
        provider: SocialProvider.GOOGLE,
        providerId: req.user.providerId,
      };

      const result = await firstValueFrom(this.authService.socialLogin(user));

      res.cookie('sessionId', result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      });

      return res.redirect('http://jobchaja.com');
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }

  @Get('apple')
  @UseGuards(Apple0AuthGuard)
  @ApiOperation({ summary: 'Initiate Apple OAuth Login' })
  async appleAuth() {}

  @Get('apple/callback')
  @UseGuards(Apple0AuthGuard)
  @ApiOperation({ summary: 'Apple OAuth callback' })
  async AppleOAuthRedirect(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
        provider: SocialProvider.GOOGLE,
        providerId: req.user.providerId,
      };

      const result = await firstValueFrom(this.authService.socialLogin(user));

      res.cookie('sessionId', result.sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
        domain: process.env.COOKIE_DOMAIN || 'localhost',
      });

      return { message: result.message };
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2),
      );
    }
  }
}
