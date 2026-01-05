import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  OnModuleInit,
  Query,
  UseGuards,
  HttpException,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import {
  GetAllUsersResponseDto,
  UserResponseDto,
  DeleteUserResponseDto,
  ChangePasswordResponseDto,
} from './dto/user-response.dto';

import { ClientGrpc } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, UserServiceClient } from 'types/auth/users';
import { firstValueFrom } from 'rxjs';
import {
  GrpcMetadataStorage,
  grpcToHttpStatus,
  Roles,
  RolesGuard,
  SessionAuthGuard,
  wrapGrpcClient,
} from '@in-job/common';
import { Metadata } from '@grpc/grpc-js';
import { Request } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(USERS_PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly metadataStorage: GrpcMetadataStorage
  ) {}

  onModuleInit() {
    const rawService = this.client.getService<UserServiceClient>('UserService');
    this.userService = wrapGrpcClient(rawService, this.metadataStorage);
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userService.createUser({
          email: createUserDto.email,
          phone: createUserDto.phone,
          fullName: createUserDto.fullName,
          password: createUserDto.password,
          role: createUserDto.role as any,
          status: createUserDto.status as any,
        })
      );

      return result as unknown as UserResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: GetAllUsersResponseDto,
  })
  async findAll(
    @Query() query: GetAllUsersDto,
    @Req() request: Request
  ): Promise<GetAllUsersResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userService.getAllUsers({
          basicQuery: {
            page: query.page,
            limit: query.limit,
            searchKeyword: query.searchKeyword,
            sortField: query.sortField,
            sortType: query.sortType,
            filterModel: query.filterModel,
            filterKeyword: query.filterKeyword,
          },
        })
      );

      return result as unknown as GetAllUsersResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userService.getUser({ userId: id })
      );

      return result as unknown as UserResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request
  ): Promise<UserResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userService.updateUser({
          userId: id,
          fullName: updateUserDto.fullName,
          email: updateUserDto.email,
          phone: updateUserDto.phone,
          password: updateUserDto.password,
          role: updateUserDto.role as any,
          status: updateUserDto.status as any,
        })
      );

      return result as unknown as UserResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @UseGuards(SessionAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: DeleteUserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string): Promise<DeleteUserResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userService.deleteUser({ userId: id })
      );

      return result as DeleteUserResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @Patch(':id/change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
    type: ChangePasswordResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Param('id') id: string
  ) {
    try {
      const result = await firstValueFrom(
        this.userService.changePassword({
          userId: id,
          oldPassword: body.oldPassword,
          newPassword: body.newPassword,
        })
      );

      return result as ChangePasswordResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }
}
