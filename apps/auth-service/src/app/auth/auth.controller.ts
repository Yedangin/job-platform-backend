import { Controller, Logger } from '@nestjs/common';
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
  SocialLoginRequest,
  UserResponse,
} from 'types/auth/auth';
import { RpcException } from '@nestjs/microservices';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { httpToGrpcStatus } from '@in-job/common';

// Helper function to convert HTTP status codes to gRPC status codes
// function httpToGrpcStatus(httpStatus: number): number {
//   const statusMap: Record<number, number> = {
//     200: 0, // OK
//     201: 0, // OK
//     400: 3, // INVALID_ARGUMENT
//     401: 16, // UNAUTHENTICATED
//     403: 7, // PERMISSION_DENIED
//     404: 5, // NOT_FOUND
//     408: 4, // DEADLINE_EXCEEDED
//     409: 6, // ALREADY_EXISTS
//     429: 8, // RESOURCE_EXHAUSTED
//     500: 13, // INTERNAL
//     501: 12, // UNIMPLEMENTED
//     503: 14, // UNAVAILABLE
//   };
//   return statusMap[httpStatus] ?? 2; // Default to UNKNOWN
// }

@Controller()
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Register')
  async register(request: RegisterRequest): Promise<RegisterSuccessResponse> {
    try {
      return await this.authService.register(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'Login')
  async login(request: LoginRequest): Promise<LoginSuccessResponse> {
    try {
      return await this.authService.login(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
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

      return await this.authService.getProfile(request.sessionId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
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

      const result = await this.authService.logout(request.sessionId);
      return result;
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'ResetPassword')
  async resetPassword(
    request: ResetPasswordRequest,
  ): Promise<PasswordResetResponse> {
    try {
      console.log('Received reset password request:', request);
      return await this.authService.resetPassword(
        request.token,
        request.newPassword,
      );
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'PasswordReset')
  async passwordReset(
    request: PasswordResetRequest,
  ): Promise<PasswordResetResponse> {
    try {
      console.log('Received new password request:', request);

      return await this.authService.requestPasswordReset(request.email);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'SocialLogin')
  async socialLogin(
    request: SocialLoginRequest,
  ): Promise<LoginSuccessResponse> {
    try {
      return await this.authService.findOrCreateOAuthUser(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
