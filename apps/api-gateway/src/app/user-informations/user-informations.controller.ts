import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  HttpException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import {
  CreateUserInformationDto,
  UpdateUserInformationDto,
  UserInformationResponseDto,
  DeleteUserInformationResponseDto,
} from './dto';
import {
  USER_INFORMATION_PACKAGE_NAME,
  UserInformationServiceClient,
} from 'types/auth/user-information';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  FileCategory,
  FileService,
  SingleFileValidatorPipe,
  grpcToHttpStatus,
  User,
} from '@in-job/common';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('User Informations')
@Controller('user-informations')
export class UserInformationsController implements OnModuleInit {
  private userInformationService: UserInformationServiceClient;

  constructor(
    @Inject(USER_INFORMATION_PACKAGE_NAME) private readonly client: ClientGrpc,
    private readonly fileService: FileService
  ) {}

  onModuleInit() {
    this.userInformationService =
      this.client.getService<UserInformationServiceClient>(
        'UserInformationService'
      );
  }

  @Post()
  @ApiOperation({ summary: 'Create new user information' })
  @ApiResponse({
    status: 201,
    description: 'User information created successfully',
    type: UserInformationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(
    @Body() createUserInformationDto: CreateUserInformationDto
  ): Promise<UserInformationResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userInformationService.createUserInformation({
          userId: createUserInformationDto.userId,
          profileImage: createUserInformationDto.profileImage,
          gender: createUserInformationDto.gender,
          address: createUserInformationDto.address,
          country: createUserInformationDto.country,
          city: createUserInformationDto.city,
          cvForm: createUserInformationDto.cvForm,
          additionalInformation: createUserInformationDto.additionalInformation,
        })
      );

      return result as unknown as UserInformationResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @Post('profile/:id')
  @ApiOperation({ summary: 'Upload profile picture' })
  @UseInterceptors(FileInterceptor('profile'))
  @ApiParam({ name: 'id', description: 'User information record id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        profile: {
          type: 'string',
          format: 'binary',
          description: 'Profile picture file (PNG, JPEG, JPG only, max 5MB)',
        },
      },
    },
  })
  async uploadProfilePicture(
    // @User() user: any,
    @Param('id') id: string,
    @UploadedFile(
      new SingleFileValidatorPipe({
        optional: false,
        allowedExtensions: ['.png', '.jpeg', '.jpg'],
        maxSize: 5 * 1024 * 1024, // 5MB
      })
    )
    file: Express.Multer.File
  ) {
    const imageUrl = await this.fileService.saveFile(
      file,
      FileCategory.PROFILES
    );
    const result = await this.userInformationService.updateProfilePicture({
      id: id,
      imageUrl: imageUrl,
      fileType: 1,
    });
    return result;
  }

  @Post('cv/:id')
  @ApiOperation({ summary: 'Upload profile picture' })
  @UseInterceptors(FileInterceptor('cv'))
    @ApiParam({ name: 'id', description: 'User information record id' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cv: {
          type: 'string',
          format: 'binary',
          description: 'Profile picture file (PDF, DOCX only, max 5MB)',
        },
      },
    },
  })
  async uploadCV(
    @Param('id') id: string,
    // @User() user: any,
    @UploadedFile(
      new SingleFileValidatorPipe({
        optional: false,
        allowedExtensions: ['.docx', '.pdf'],
        maxSize: 5 * 1024 * 1024, // 5MB
      })
    )
    file: Express.Multer.File
  ) {
    const cvUrl = await this.fileService.saveFile(file, FileCategory.CVS);
    const result = await this.userInformationService.updateProfilePicture({
      id: id,
      imageUrl: cvUrl,
      fileType: 2,
    });
    return result;
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all user informations with pagination' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User informations retrieved successfully',
  //   type: GetAllUserInformationsResponseDto,
  // })
  // async findAll(
  //   @Query() query: GetAllUserInformationsDto,
  // ): Promise<GetAllUserInformationsResponseDto> {
  //   const result = await firstValueFrom(
  //     this.userInformationService.getAllUserInformations({
  //       basicQuery: {
  //         page: query.page,
  //         limit: query.limit,
  //         searchKeyword: query.searchKeyword,
  //         sortField: query.sortField,
  //         sortType: query.sortType,
  //         filterModel: query.filterModel,
  //         filterKeyword: query.filterKeyword,
  //       },
  //     }),
  //   );

  //   return result as unknown as GetAllUserInformationsResponseDto;
  // }

  // @Get(':userId')
  // @ApiOperation({ summary: 'Get user information by user ID' })
  // @ApiParam({ name: 'userId', description: 'User ID' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User information retrieved successfully',
  //   type: UserInformationResponseDto,
  // })
  // @ApiResponse({ status: 404, description: 'User information not found' })
  // async findOne(
  //   @Param('userId') userId: string,
  // ): Promise<UserInformationResponseDto> {
  //   const result = await firstValueFrom(
  //     this.userInformationService.getUserInformation({ userId }),
  //   );

  //   return result as unknown as UserInformationResponseDto;
  // }
  @Patch(':userId')
  @ApiOperation({ summary: 'Update user information' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User information updated successfully',
    type: UserInformationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User information not found' })
  async update(
    @Param('userId') userId: string,
    @Body() updateUserInformationDto: UpdateUserInformationDto
  ): Promise<UserInformationResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userInformationService.updateUserInformation({
          userId,
          profileImage: updateUserInformationDto.profileImage,
          gender: updateUserInformationDto.gender,
          address: updateUserInformationDto.address,
          country: updateUserInformationDto.country,
          city: updateUserInformationDto.city,
          cvForm: updateUserInformationDto.cvForm,
          additionalInformation: updateUserInformationDto.additionalInformation,
        })
      );

      return result as unknown as UserInformationResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user information' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User information deleted successfully',
    type: DeleteUserInformationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User information not found' })
  async remove(
    @Param('userId') userId: string
  ): Promise<DeleteUserInformationResponseDto> {
    try {
      const result = await firstValueFrom(
        this.userInformationService.deleteUserInformation({ userId })
      );

      return result as DeleteUserInformationResponseDto;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }
}
