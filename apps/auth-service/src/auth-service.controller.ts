import { Controller, Logger } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import {
  GetProfileRequest,
  LoginRequest,
  LogoutRequest,
  RegisterRequest,
  RegisterSuccessResponse,
  Success,
  UserResponse,
} from 'types/proto/auth/auth';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
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
  async login(request: LoginRequest): Promise<Success> {
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
  async getProfile(
    request: GetProfileRequest,
    metadata: Metadata,
  ): Promise<UserResponse> {
    try {
      // Extract session ID from metadata
      const sessionId = this.extractSessionId(metadata);

      if (!sessionId) {
        throw new RpcException({
          code: 401,
          message: 'Session ID not provided',
        });
      }

      return await this.authServiceService.getProfile(sessionId);
    } catch (error) {
      throw new RpcException({
        code: error.status || 500,
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('AuthService', 'Logout')
  async logout(
    request: LogoutRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<Success> {
    try {
      // Extract session ID from metadata
      const sessionId = this.extractSessionId(metadata);

      if (!sessionId) {
        throw new RpcException({
          code: 401,
          message: 'Session ID not provided',
        });
      }

      const result = await this.authServiceService.logout(sessionId);

      // Clear session cookie
      const responseMetadata = new Metadata();
      responseMetadata.set(
        'set-cookie',
        `sessionId=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
      );
      call.sendMetadata(responseMetadata);

      return result;
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
