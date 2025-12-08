import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AllInterviewsWithMetaResponse,
  GetAllInterviewsRequest,
  GetInterviewRequest,
  CreateInterviewRequest,
  UpdateInterviewRequest,
  DeleteInterviewRequest,
  InterviewResponse,
  DeleteInterviewResponse,
  ListInterviewResponse,
} from 'types/job/interview';
import { httpToGrpcStatus } from '@in-job/common';
import { InterviewService } from './interview.service';

@Controller()
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @GrpcMethod('InterviewService', 'CreateInterview')
  async CreateInterview(
    request: CreateInterviewRequest
  ): Promise<InterviewResponse> {
    try {
      return this.interviewService.create({
        jobPostId: request.jobPostId,
        memberId: request.memberId,
        corporateId: request.corporateId,
        roomId: request.roomId,
        interviewDate: request.interviewDate,
        status: request.status,
        failureReason: request.failureReason,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('InterviewService', 'GetAllInterviews')
  async GetAllInterviews(
    request: GetAllInterviewsRequest
  ): Promise<AllInterviewsWithMetaResponse> {
    try {
      return this.interviewService.findAll(request.basicQuery);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('InterviewService', 'GetInterview')
  async GetInterview(
    request: GetInterviewRequest
  ): Promise<ListInterviewResponse> {
    try {
      return this.interviewService.findOne(request.interviewId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('InterviewService', 'UpdateInterview')
  async UpdateInterview(
    request: UpdateInterviewRequest
  ): Promise<InterviewResponse> {
    try {
      return this.interviewService.update(request.interviewId, {
        roomId: request.roomId,
        interviewDate: request.interviewDate,
        status: request.status,
        failureReason: request.failureReason,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('InterviewService', 'DeleteInterview')
  async DeleteInterview(
    request: DeleteInterviewRequest
  ): Promise<DeleteInterviewResponse> {
    try {
      return this.interviewService.remove(request.interviewId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('InterviewService', 'ListInterviews')
  async ListInterviews(request: any): Promise<AllInterviewsWithMetaResponse> {
    try {
      const basicQuery = {
        page: request.page || 1,
        limit: request.limit || 10,
        searchKeyword: request.search || '',
        filterModel: {
          jobPostId: request.jobPostId,
          memberId: request.memberId,
          corporateId: request.corporateId,
          status: request.status,
        },
      };

      return this.interviewService.findAll(basicQuery);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }
}
