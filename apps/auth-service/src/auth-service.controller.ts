import { Controller, Logger } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import {
  GetProfileRequest,
  LoginRequest,
  LoginSuccessResponse,
  LogoutRequest,
  PasswordResetRequest,
  PasswordResetResponse,
  RegisterRequest,
  RegisterSuccessResponse,
  ResetPasswordRequest,
  UserResponse,
} from 'types/proto/auth/auth';
import { Metadata } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthServiceController {
  private logger = new Logger(AuthServiceController.name);
  constructor(private readonly authServiceService: AuthServiceService) {}

  @GrpcMethod('AuthService', 'Register')
  async register(request: RegisterRequest): Promise<RegisterSuccessResponse> {
    try {
      return await this.authServiceService.register(request);
    } catch (error) {
      throw new RpcException({
        code: error.status || 500,
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'Login')
  async login(request: LoginRequest): Promise<LoginSuccessResponse> {
    try {
      return await this.authServiceService.login(request);
    } catch (error) {
      throw new RpcException({
        code: error.status || 500,
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'GetProfile')
  async getProfile(request: GetProfileRequest): Promise<UserResponse> {
    try {
      if (!request.sessionId) {
        throw new RpcException({
          code: 401,
          message: 'Session ID not provided',
        });
      }

      return await this.authServiceService.getProfile(request.sessionId);
    } catch (error) {
      throw new RpcException({
        code: error.status || 500,
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'Logout')
  async logout(request: LogoutRequest): Promise<RegisterSuccessResponse> {
    try {
      if (!request.sessionId) {
        throw new RpcException({
          code: 401,
          message: 'Session ID not provided',
        });
      }

      const result = await this.authServiceService.logout(request.sessionId);
      return result;
    } catch (error) {
      throw new RpcException({
        code: error.status || 500,
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'ResetPassword')
  async resetPassword(
    request: ResetPasswordRequest,
  ): Promise<PasswordResetResponse> {
    try {
      return await this.authServiceService.resetPassword(
        request.token,
        request.newPassword,
      );
    } catch (error) {
      throw new RpcException({
        code: error.status || 500,
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'PasswordReset')
  async passwordReset(
    request: PasswordResetRequest,
  ): Promise<PasswordResetResponse> {
    try {
      return await this.authServiceService.requestPasswordReset(request.email);
    } catch (error) {
      throw new RpcException({
        code: error.status || 500,
        message: error.message || 'Internal server error',
      });
    }
  }

  private extractSessionId(metadata: Metadata): string | null {
    if (!metadata) {
      return null;
    }

    const cookies = metadata.get('cookie');
    if (!cookies || cookies.length === 0) {
      return null;
    }

    const cookieString = cookies[0].toString();
    const sessionCookie = cookieString
      .split(';')
      .find((c) => c.trim().startsWith('sessionId='));

    if (!sessionCookie) {
      return null;
    }

    return sessionCookie.split('=')[1].trim();
  }
}
