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

import { ApplyJobServices } from './apply.service';
import { CreateApplyDto } from './dto/apply.dto';
import {
  Pagination,
  PaginationParams,
} from 'libs/common/src/common/decorator/get-pagination-data.decorator';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Response as ExpressResponse } from 'express';
import { FileService } from 'libs/common/src/common/file/file.service';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('applies')
export class ApplyJobController {
  constructor(
    private readonly applyJobService: ApplyJobServices,
    private readonly fileService: FileService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @GrpcMethod('ApplyJobService', 'CreateApplyJob')
  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async createJobPost(
    @UploadedFile() file: any,
    @Body() createApplyDto: CreateApplyDto,
    @Res() res: any,
  ) {
    const resumeFile = file ? await this.fileService.saveFile(file) : undefined;

    console.log('FILE URL', resumeFile);

    const dataWithFile: CreateApplyDto & { resumeFile?: string } = {
      ...createApplyDto,
      ...(resumeFile ? { resumeFile } : {}),
    };

    return await this.applyJobService.create(dataWithFile, res);
  }

  //   @GrpcMethod('JobPostService', 'GetAllJobPosts')
  //   @Get('/list')
  //   async getAllJobPost(
  //     @PaginationParams() paginationParams: Pagination,
  //     @Res()
  //     res: any,
  //     @Query('search') search: string,
  //   ) {
  //     return await this.applyJobService.findAll(
  //       paginationParams,
  //       search?.trim() || '',
  //       res,
  //     );
  //   }

  //   @GrpcMethod('JobPostService', 'GetAJobPost')
  //   @Get('/:id')
  //   async getAJobPost(@Param('id') id: string, @Res() res: any) {
  //     return await this.applyJobService.findOne(id, res);
  //   }

  //   @Patch('/status/:id')
  //   async updateJobPostingStatus(@Param('id') id: string) {
  //     return await this.applyJobService.updateStatus(id);
  //   }

  //   @GrpcMethod('JobPostService', 'UpdateJobPosts')
  //   @Patch('/update/:id')
  //   @UseInterceptors(FileInterceptor('image'))
  //   @ApiConsumes('multipart/form-data')
  //   async updateJobPost(
  //     @Param('id') id: string,
  //     @Body() updateJobPost: UpdateJobDto,
  //     @UploadedFile() file: any,
  //     @Res() res: any,
  //   ) {
  //     return await this.applyJobService.updateJobPost(id, updateJobPost, file, res);
  //   }
}
