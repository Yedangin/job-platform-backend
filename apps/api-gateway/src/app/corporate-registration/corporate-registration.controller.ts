import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  Inject,
  HttpCode,
  HttpStatus,
  UseGuards,
  HttpException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCorporateRegistrationDto } from './dto/create-corporate-registration.dto';
import { UpdateCorporateRegistrationDto } from './dto/update-corporate-registration.dto';
import {
  CORPORATE_REGISTRATION_PACKAGE_NAME,
  CORPORATE_REGISTRATION_SERVICE_NAME,
  CorporateRegistrationClient,
} from 'types/auth/corporate-registration';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import {
  grpcToHttpStatus,
  Roles,
  RolesGuard,
  SessionAuthGuard,
  SessionData,
  CurrentSession,
  SingleFileValidatorPipe,
  FileCategory,
  FileService,
} from '@in-job/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('corporate-registration')
export class CorporateRegistrationController implements OnModuleInit {
  private corporateService: CorporateRegistrationClient;
  constructor(
    @Inject(CORPORATE_REGISTRATION_PACKAGE_NAME)
    private corporateRegistrationClient: ClientGrpc,
    private readonly fileService: FileService
  ) {}
  onModuleInit() {
    this.corporateService =
      this.corporateRegistrationClient.getService<CorporateRegistrationClient>(
        CORPORATE_REGISTRATION_SERVICE_NAME
      );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new corporate registration' })
  @ApiCreatedResponse({
    description: 'Corporate registration created successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({
    description: 'Corporate registration already exists for this user',
  })
  @ApiBody({ type: CreateCorporateRegistrationDto })
  async create(
    @Body() createCorporateRegistrationDto: CreateCorporateRegistrationDto
  ) {
    try {
      const result = await firstValueFrom(
        this.corporateService.createCorporateRegistration({
          userId: createCorporateRegistrationDto.userId,
          companyName: createCorporateRegistrationDto.companyName,
          businessLicenseFile:
            createCorporateRegistrationDto.businessLicenseFile,
        })
      );
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @Post('business-license-upload/:id')
  @ApiOperation({ summary: 'Upload business license file' })
  @UseInterceptors(FileInterceptor('businessLicense'))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Corporate record id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        businessLicense: {
          type: 'string',
          format: 'binary',
          description: 'Profile picture file (PDF, DOCX only, max 5MB)',
        },
      },
    },
  })
  async uploadBusinessLicense(
    // @User() user: any,
    @Param('id') id: string,
    @UploadedFile(
      new SingleFileValidatorPipe({
        optional: false,
        allowedExtensions: ['.docx', '.pdf'],
        maxSize: 5 * 1024 * 1024, // 5MB
      })
    )
    file: Express.Multer.File
  ) {
    const cvUrl = await this.fileService.saveFile(
      file,
      FileCategory.BUSINESS_LICENSES
    );
    const result = await this.corporateService.updateBusinessLicense({
      id: id,
      businessLicenseFile: cvUrl,
    });
    return result;
  }

  @Patch(':id')
  @UseGuards(SessionAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Update corporate registration' })
  @ApiParam({ name: 'id', description: 'Registration record ID' })
  @ApiOkResponse({
    description: 'Corporate registration updated successfully',
  })
  @ApiNotFoundResponse({
    description: 'Corporate registration or verifier not found',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiBody({ type: UpdateCorporateRegistrationDto })
  async update(
    @Param('id') id: string,
    @CurrentSession() session: SessionData,
    @Body() updateCorporateRegistrationDto: UpdateCorporateRegistrationDto
  ) {
    try {
      const result = await firstValueFrom(
        this.corporateService.updateCorporateRegistration({
          id: id,
          companyName: updateCorporateRegistrationDto.companyName,
          businessLicenseFile:
            updateCorporateRegistrationDto.businessLicenseFile,
          verificationStatus:
            updateCorporateRegistrationDto.verificationStatus as any,
          isVerifiedBy: session.userId,
        })
      );
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete corporate registration' })
  @ApiParam({ name: 'id', description: 'Registration record ID' })
  @ApiNoContentResponse({
    description: 'Corporate registration deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Corporate registration not found' })
  async remove(@Param('id') id: string) {
    try {
      const result = await firstValueFrom(
        this.corporateService.deleteCorporateRegistration({ id })
      );
      return result;
    } catch (error: any) {
      throw new HttpException(
        error.details ?? error.message ?? 'Internal server error',
        grpcToHttpStatus(error.code ?? 2)
      );
    }
  }
}
