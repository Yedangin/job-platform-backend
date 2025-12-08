import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AllJobPostsWithMetaResponse,
  GetAllJobPostsRequest,
  GetJobPostRequest,
  CreateJobPostRequest,
  UpdateJobPostRequest,
  DeleteJobPostRequest,
  JobPostResponse,
  DeleteJobPostResponse,
  ListJobPostResponse,
} from 'types/job/job-post';
import { httpToGrpcStatus } from '@in-job/common';
import { JobPostService } from './job-post.service';

@Controller()
export class JobPostController {
  constructor(private readonly jobPostService: JobPostService) {}

  @GrpcMethod('JobPostService', 'CreateJobPost')
  async CreateJobPost(request: CreateJobPostRequest): Promise<JobPostResponse> {
    try {
      return this.jobPostService.create({
        title: request.title,
        description: request.description,
        location: request.location,
        salaryRange: request.salaryRange,
        categoryId: request.categoryId,
        feeType: request.feeType,
        status: request.status,
        expiredAt: request.expiredAt,
        corporateId: request.corporateId,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('JobPostService', 'GetAllJobPosts')
  async GetAllJobPosts(
    request: GetAllJobPostsRequest
  ): Promise<AllJobPostsWithMetaResponse> {
    try {
      return this.jobPostService.findAll(request.basicQuery);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('JobPostService', 'GetJobPost')
  async GetJobPost(request: GetJobPostRequest): Promise<ListJobPostResponse> {
    try {
      return this.jobPostService.findOne(request.jobPostId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('JobPostService', 'UpdateJobPost')
  async UpdateJobPost(request: UpdateJobPostRequest): Promise<JobPostResponse> {
    try {
      return this.jobPostService.update(request.jobPostId, {
        title: request.title,
        description: request.description,
        location: request.location,
        salaryRange: request.salaryRange,
        categoryId: request.categoryId,
        feeType: request.feeType,
        status: request.status,
        expiredAt: request.expiredAt,
        approvedBy: request.approvedBy,
        appliesCount: request.appliesCount,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('JobPostService', 'DeleteJobPost')
  async DeleteJobPost(
    request: DeleteJobPostRequest
  ): Promise<DeleteJobPostResponse> {
    try {
      return this.jobPostService.remove(request.jobPostId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('JobPostService', 'ListJobPosts')
  async ListJobPosts(request: any): Promise<AllJobPostsWithMetaResponse> {
    try {
      const basicQuery = {
        page: request.page || 1,
        limit: request.limit || 10,
        searchKeyword: request.search || '',
        filterModel: {
          corporateId: request.corporateId,
          categoryId: request.categoryId,
          status: request.status,
        },
      };

      return this.jobPostService.findAll(basicQuery);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
