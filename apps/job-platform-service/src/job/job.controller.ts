import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JobServices } from './job.service';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import {
  Pagination,
  PaginationParams,
} from 'libs/common/src/common/decorator/get-pagination-data.decorator';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Response as ExpressResponse } from 'express';
import { FileService } from 'libs/common/src/common/file/file.service';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('jobs')
export class JobController {
  constructor(
    private readonly jobService: JobServices,
    private readonly fileService: FileService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @GrpcMethod('JobPostService', 'CreateJobPost')
  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  async createJobPost(
    @UploadedFile() file: any,
    @Body() createJobPost: CreateJobDto,
    @Res() res: any,
  ) {
    const fileUrl = file ? await this.fileService.saveFile(file) : undefined;

    console.log('FILE URL', fileUrl);

    const dataWithFile: CreateJobDto & { fileUrl?: string } = {
      ...createJobPost,
      ...(fileUrl ? { fileUrl } : {}),
    };

    return await this.jobService.create(dataWithFile, res);
  }

  @GrpcMethod('JobPostService', 'GetAllJobPosts')
  @Get('/list')
  async getAllJobPost(
    @PaginationParams() paginationParams: Pagination,
    @Res()
    res: any,
    @Query('search') search: string,
  ) {
    return await this.jobService.findAll(
      paginationParams,
      search?.trim() || '',
      res,
    );
  }

  @GrpcMethod('JobPostService', 'GetAJobPost')
  @Get('/:id')
  async getAJobPost(@Param('id') id: string, @Res() res: any) {
    return await this.jobService.findOne(id, res);
  }

  // @Patch('status/:id')
  // async updateCategoryStatus(@Param('id') id: string) {
  //   return await this.jobService.updateStatus(id);
  // }

  @GrpcMethod('JobPostService', 'UpdateJobPosts')
  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async updateJobPost(
    @Param('id') id: string,
    @Body() updateJobPost: UpdateJobDto,
    @UploadedFile() file: any,
    @Res() res: any,
  ) {
    return await this.jobService.updateJobPost(id, updateJobPost, file, res);
  }
}
