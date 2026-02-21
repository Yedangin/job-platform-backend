import { InjectQueue } from '@nestjs/bullmq';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bullmq';

import { Pagination } from '../../../../libs/common/src/common/decorator/get-pagination-data.decorator';

// import {} from './dto/job.dto';

import {
  JobPrismaService,
  PaginationResult,
  PaginationService,
} from 'libs/common/src';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
import { Prisma } from '../../../../generated/prisma-job/index';
import { Multer } from 'multer';
import { successResponse } from 'libs/common/src/common/interceptor/response';

@Injectable()
export class JobServices {
  constructor(
    private prisma: JobPrismaService,
    private configService: ConfigService,
  ) {}

  async create(data: CreateJobDto & { fileUrl?: string }, res?: Response) {
    try {
      const { title } = data;

      const existingjobPost = await this.prisma.jobPosting.findFirst({
        where: {
          OR: [{ title }],
        },
      });

      // console.log('CORPORATE', corporateId);

      if (existingjobPost) {
        throw new HttpException('Job Post already exit', HttpStatus.CONFLICT);
      }

      // console.log('INSITE', data.fileUrl);

      const createData: Prisma.JobPostingCreateInput = {
        corporateId: BigInt(data.corporateId), // always exists
        title: data.title,
        description: data.description,
        boardType: data.boardType,
        displayAddress: data.displayAddress ?? '',
        actualAddress: data.actualAddress ?? '',
        allowedVisas: data.allowedVisas ?? '',
        contactName: data.contactName ?? '',
        contactPhone: data.contactPhone ?? '',
        closingDate: data.closingDate ? new Date(data.closingDate) : null,
        workContentImg: data.fileUrl ?? undefined,
      };

      // console.log('DATA', createData);

      const createJobPost = await this.prisma.jobPosting.create({
        data: createData,
      });

      // console.log('CREATE', createJobPost);

      // if (file) {
      //   await this.BrandFileQueue.add(
      //     'brand-file',
      //     {
      //       buffer: file.buffer,
      //       originalname: file.originalname,
      //       mimetype: file.mimetype,
      //       id: createBrand?.id,
      //     },
      //     {
      //       removeOnComplete: true,
      //       removeOnFail: true,
      //     },
      //   );
      // }

      const serializedJobPost = {
        ...createJobPost,
        jobId: createJobPost.jobId.toString(),
        corporateId: createJobPost.corporateId.toString(),
      };

      return successResponse({
        res,
        message: 'Job created successfully',
        data: serializedJobPost,
      });

      // return {
      //   createJobPost: serializedJobPost,
      //   message: 'Created successfully',
      // };
    } catch (error) {
      console.error('CREATE JOB ERROR', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(paginationParams: Pagination, search?: string, res?: Response) {
    try {
      const { skip = 0, take = 10 } = paginationParams || {};

      const where: Prisma.JobPostingWhereInput = {};

      if (search) {
        const searchNumber = Number(search);
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          ...(isNaN(searchNumber)
            ? []
            : [{ corporateId: BigInt(searchNumber) }]),
        ];
      }

      const [jobPosts, totalCount] = await this.prisma.$transaction([
        this.prisma.jobPosting.findMany({
          skip,
          take,
          where,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.jobPosting.count({ where }),
      ]);

      const pageCount = Math.ceil(totalCount / take);

      const serializedJobs = jobPosts.map((job) => ({
        ...job,
        jobId: job.jobId.toString(),
        corporateId: job.corporateId.toString(),
      }));

      return successResponse({
        res,
        message: 'Jobs fetched List',
        data: serializedJobs,
        extra: { pageCount, totalCount },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string, res?: Response) {
    try {
      const existingJobPost = await this.prisma.jobPosting.findFirst({
        where: { jobId: BigInt(id) },
      });

      // console.log('HELLO', existingJobPost);

      if (!existingJobPost) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      const serializedJobPost = {
        ...existingJobPost,
        jobId: existingJobPost.jobId.toString(),
        corporateId: existingJobPost.corporateId.toString(),
      };

      return successResponse({
        res,
        message: 'Jobs Details',
        data: serializedJobPost,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateJobPost(
    id: string,
    data: UpdateJobDto,
    file: any,
    res?: Response,
  ) {
    try {
      let jobId: bigint;
      try {
        jobId = BigInt(id);
      } catch {
        throw new HttpException('Invalid job ID', HttpStatus.BAD_REQUEST);
      }
      const existingJobPost = await this.prisma.jobPosting.findUnique({
        where: { jobId },
      });

      if (!existingJobPost) {
        throw new HttpException('Job Post not found', HttpStatus.NOT_FOUND);
      }

      // Transform fields if necessary
      const { corporateId, closingDate, ...rest } = data;

      const updateData: Prisma.JobPostingUpdateInput = {
        ...rest,
        ...(corporateId !== undefined && { corporateId: BigInt(corporateId) }),
        ...(closingDate !== undefined && {
          closingDate: new Date(closingDate),
        }),
      };

      const jobPost = await this.prisma.jobPosting.update({
        where: { jobId },
        data: updateData,
      });

      const serializedJobPost = {
        ...jobPost,
        jobId: jobPost.jobId.toString(),
        corporateId: jobPost.corporateId.toString(),
      };

      // if (file) {
      //   await this.BrandFileQueue.add(
      //     'brand-file',
      //     {
      //       buffer: file.buffer,
      //       originalname: file.originalname,
      //       mimetype: file.mimetype,
      //       id: existingBrand?.id,
      //       oldFile: existingBrand?.image,
      //     },
      //     {
      //       removeOnComplete: true,
      //       removeOnFail: true,
      //     },
      //   );
      // }

      return successResponse({
        res,
        message: 'Jobs updated',
        data: serializedJobPost,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async updateStatus(id: string) {
  //   try {
  //     const existingJobPost = await this.prisma.jobPost.findFirst({
  //       where: { id },
  //     });

  //     if (!existingJobPost) {
  //       throw new HttpException('Job Post Not Found', HttpStatus.NOT_FOUND);
  //     }
  //     await this.prisma.jobPost.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         status: !existingCategory.status,
  //       },
  //     });
  //     return { message: 'Status Update Suceessfully' };
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Internal server error');
  //   }
  // }
}
