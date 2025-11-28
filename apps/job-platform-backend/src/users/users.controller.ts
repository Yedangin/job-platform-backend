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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import {
  GetAllUsersResponseDto,
  UserResponseDto,
  DeleteUserResponseDto,
} from './dto/user-response.dto';

import { ClientGrpc } from '@nestjs/microservices';
import { USERS_PACKAGE_NAME, UserServiceClient } from 'types/auth/users';
import { firstValueFrom } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UsersController implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(USERS_PACKAGE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const result = await firstValueFrom(
      this.userService.createUser({
        email: createUserDto.email,
        phone: createUserDto.phone,
        fullName: createUserDto.fullName,
        password: createUserDto.password,
        role: createUserDto.role as any,
        status: createUserDto.status as any,
      }),
    );

    return result as unknown as UserResponseDto;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
    type: GetAllUsersResponseDto,
  })
  async findAll(
    @Query() query: GetAllUsersDto,
  ): Promise<GetAllUsersResponseDto> {
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
      }),
    );

    return result as unknown as GetAllUsersResponseDto;
  }

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
    const result = await firstValueFrom(
      this.userService.getUser({ userId: id }),
    );

    return result as unknown as UserResponseDto;
  }

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
  ): Promise<UserResponseDto> {
    const result = await firstValueFrom(
      this.userService.updateUser({
        userId: id,
        fullName: updateUserDto.fullName,
        email: updateUserDto.email,
        phone: updateUserDto.phone,
        password: updateUserDto.password,
        role: updateUserDto.role as any,
        status: updateUserDto.status as any,
      }),
    );

    return result as unknown as UserResponseDto;
  }

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
    const result = await firstValueFrom(
      this.userService.deleteUser({ userId: id }),
    );

    return result as DeleteUserResponseDto;
  }
}
