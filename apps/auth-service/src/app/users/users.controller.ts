import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  AllUsersWithMetaResponse,
  GetAllUsersRequest,
  GetUserRequest,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
  UserResponse,
  DeleteUserResponse,
  CreateUserResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from 'types/auth/users';
import { GrpcAuthGuard, httpToGrpcStatus } from '@in-job/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async CreateUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      return this.usersService.create({
        email: request.email,
        phone: request.phone,
        fullName: request.fullName,
        password: request.password,
        role: request.role,
        status: request.status,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('UserService', 'GetAllUsers')
  async GetAllUsers(
    request: GetAllUsersRequest
  ): Promise<AllUsersWithMetaResponse> {
    try {
      const users = await this.usersService.findAll(request.basicQuery);
      return users;
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserService', 'GetUser')
  async GetUser(request: GetUserRequest): Promise<UserResponse> {
    try {
      return this.usersService.findOne(request.userId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async UpdateUser(request: UpdateUserRequest): Promise<CreateUserResponse> {
    try {
      return this.usersService.update(request.userId, {
        fullName: request.fullName,
        email: request.email,
        phone: request.phone,
        password: request.password,
        role: request.role,
        status: request.status,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async DeleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    try {
      return this.usersService.remove(request.userId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('UserService', 'ChangePassword')
  async ChangePassword(
    request: ChangePasswordRequest
  ): Promise<ChangePasswordResponse> {
    try {
      return this.usersService.changePassword(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
