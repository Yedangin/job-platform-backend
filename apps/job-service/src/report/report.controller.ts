import { Controller } from '@nestjs/common';
import { ReportService } from './report.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  AllReportsWithMetaResponse,
  CreateReportRequest,
  DeleteReportRequest,
  DeleteReportResponse,
  GetAllReportsRequest,
  GetReportRequest,
  ReportResponse,
  SingleReportResponse,
  UpdateReportRequest,
} from 'types/job/report';
import { httpToGrpcStatus } from 'libs/common/src/common/helper/htto-to-grpc.helper';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @GrpcMethod('ReportService', 'CreateReport')
  async CreateReport(request: CreateReportRequest): Promise<ReportResponse> {
    try {
      return await this.reportService.create(request);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReportService', 'GetAllReports')
  async GetAllReports(
    request: GetAllReportsRequest,
  ): Promise<AllReportsWithMetaResponse> {
    try {
      const reports = await this.reportService.findAll(request.basicQuery);
      return reports;
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReportService', 'GetReport')
  async GetReport(request: GetReportRequest): Promise<SingleReportResponse> {
    try {
      return await this.reportService.findOne(request.reportId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReportService', 'UpdateReport')
  async UpdateReport(request: UpdateReportRequest): Promise<ReportResponse> {
    try {
      return this.reportService.update(request.reportId, {
        reportId: request.reportId,
        title: request.title,
        reason: request.reason,
        status: request.status as any,
      });
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  @GrpcMethod('ReportService', 'DeleteReport')
  async DeleteReport(
    request: DeleteReportRequest,
  ): Promise<DeleteReportResponse> {
    try {
      return await this.reportService.remove(request.reportId);
    } catch (error: any) {
      throw new RpcException({
        code: httpToGrpcStatus(error.status ?? 500),
        message: error.message || 'Internal server error',
      });
    }
  }

  // @GrpcMethod('ReportService', 'ListReports')
  // async ListReports(request: any): Promise<any> {
  //   try {
  //     return this.reportService.listReports(request);
  //   } catch (error: any) {
  //     throw new RpcException({
  //       code: httpToGrpcStatus(error.status ?? 500),
  //       message: error.message || 'Internal server error',
  //     });
  //   }
  // }
}
