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
import { CorporateUpdateApplyDto, CreateApplyDto } from './dto/apply.dto';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
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

    // console.log('FILE URL', resumeFile);

    const dataWithFile: CreateApplyDto & { resumeFile?: string } = {
      ...createApplyDto,
      ...(resumeFile ? { resumeFile } : {}),
    };

    return await this.applyJobService.create(dataWithFile, res);
  }

  @GrpcMethod('ApplyJobService', 'UpdateApplyJob')
  @Patch('/update/by-corporate/:id')
  async updateJobPost(
    @Param('id') id: string,
    @Body() corporateUpdateApplyJobPost: CorporateUpdateApplyDto,
    @Res() res: any,
  ) {
    return await this.applyJobService.corporateActionByApplyId(
      id,
      corporateUpdateApplyJobPost,
      res,
    );
  }
}
