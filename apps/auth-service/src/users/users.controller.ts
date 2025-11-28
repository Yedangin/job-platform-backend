import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
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
} from 'types/auth/users';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async CreateUser(request: CreateUserRequest): Promise<UserResponse> {
    return this.usersService.create({
      email: request.email,
      phone: request.phone,
      fullName: request.fullName,
      password: request.password,
      role: request.role as any,
      status: request.status as any,
    });
  }

  @GrpcMethod('UserService', 'GetAllUsers')
  async GetAllUsers(
    request: GetAllUsersRequest,
  ): Promise<AllUsersWithMetaResponse> {
    const users = await this.usersService.findAll(request.basicQuery);
    return users;
  }

  @GrpcMethod('UserService', 'GetUser')
  async GetUser(request: GetUserRequest): Promise<UserResponse> {
    return this.usersService.findOne(request.userId);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async UpdateUser(request: UpdateUserRequest): Promise<UserResponse> {
    return this.usersService.update(request.userId, {
      fullName: request.fullName,
      email: request.email,
      phone: request.phone,
      password: request.password,
      role: request.role as any,
      status: request.status as any,
    });
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async DeleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
    return this.usersService.remove(request.userId);
  }
}
