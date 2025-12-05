import { Injectable, NotFoundException } from '@nestjs/common';
import { Report } from 'generated/prisma-job';
import {
  JobPrismaService,
  PaginationResult,
  PaginationService,
} from 'libs/common/src';
import {
  AllReportsWithMetaResponse,
  CreateReportRequest,
  DeleteReportResponse,
  ReportResponse,
  ReportStatus,
  SingleReportResponse,
  UpdateReportRequest,
} from 'types/job/report';

@Injectable()
export class ReportService {
  constructor(
    private readonly prisma: JobPrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  private mapReportStatus(status: string): ReportStatus {
    const statusMap: Record<string, ReportStatus> = {
      PENDING: ReportStatus.PENDING,
      UNDER_REVIEW: ReportStatus.UNDER_REVIEW,
      RESOLVED: ReportStatus.RESOLVED,
      REJECTED: ReportStatus.REJECTED,
      CLOSED: ReportStatus.CLOSED,
    };
    return statusMap[status] || ReportStatus.REPORT_STATUS_UNSPECIFIED;
  }

  private mapReportToResponse(report: Report) {
    return {
      id: report.id,
      title: report.title || undefined,
      reporterId: report.reporterId,
      reportedUserId: report.reportedUserId,
      reason: report.reason || undefined,
      status: this.mapReportStatus(report.status as string),
      createdAt: report.createdAt.toISOString(),
    };
  }

  async findAll(basicQuery: any): Promise<AllReportsWithMetaResponse> {
    const searchColumn = ['id', 'title', 'reason', 'status'];

    const result = await this.paginationService.paginate<Report>(
      basicQuery,
      this.prisma.report,
      searchColumn,
      {
        // Include any relations if needed
      },
    );

    const mappedData = (result as PaginationResult<Report>)?.data.map(
      (report) => this.mapReportToResponse(report),
    );

    return { data: mappedData, meta: result.meta };
  }

  // async listReports(query: any): Promise<any> {
  //   const {
  //     page = 1,
  //     limit = 10,
  //     status,
  //     reporter_id,
  //     reported_user_id,
  //   } = query;

  //   const where: any = {};

  //   if (status) where.status = status;
  //   if (reporter_id) where.reporterId = reporter_id;
  //   if (reported_user_id) where.reportedUserId = reported_user_id;

  //   const [reports, total] = await Promise.all([
  //     this.prisma.report.findMany({
  //       where,
  //       skip: (page - 1) * limit,
  //       take: limit,
  //       orderBy: { createdAt: 'desc' },
  //     }),
  //     this.prisma.report.count({ where }),
  //   ]);

  //   const mappedReports = reports.map((report) =>
  //     this.mapReportToResponse(report),
  //   );

  //   return {
  //     reports: mappedReports,
  //     total,
  //     page,
  //     limit,
  //   };
  // }

  async findOne(reportId: string): Promise<SingleReportResponse> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${reportId} not found`);
    }

    return {
      message: 'Report retrieved successfully',
      report: {
        id: report.id,
        title: report.title || undefined,
        reporterId: report.reporterId,
        reportedUserId: report.reportedUserId,
        reason: report.reason || undefined,
        status: this.mapReportStatus(report.status as string),
        createdAt: report.createdAt.toISOString(),
      },
    };
  }

  async create(createReportDto: CreateReportRequest): Promise<ReportResponse> {
    const report = await this.prisma.report.create({
      data: {
        title: createReportDto.title,
        reporterId: createReportDto.reporterId,
        reportedUserId: createReportDto.reportedUserId,
        reason: createReportDto.reason,
        status: (createReportDto.status as any) || 'PENDING',
      },
    });

    return {
      success: true,
      message: 'Report created successfully',
    };
  }

  async update(updateReportDto: UpdateReportRequest): Promise<ReportResponse> {
    const { reportId } = updateReportDto;
    const existingReport = await this.prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!existingReport) {
      throw new NotFoundException(`Report with ID ${reportId} not found`);
    }

    const updateData: any = {};

    if (updateReportDto.title !== undefined)
      updateData.title = updateReportDto.title;
    if (updateReportDto.reason !== undefined)
      updateData.reason = updateReportDto.reason;
    if (updateReportDto.status !== undefined)
      updateData.status = updateReportDto.status;

    const report = await this.prisma.report.update({
      where: { id: reportId },
      data: updateData,
    });

    return {
      success: true,
      message: 'Report updated successfully',
    };
  }

  async remove(reportId: string): Promise<DeleteReportResponse> {
    const existingReport = await this.prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!existingReport) {
      throw new NotFoundException(`Report with ID ${reportId} not found`);
    }

    await this.prisma.report.delete({
      where: { id: reportId },
    });

    return {
      success: true,
      message: 'Report deleted successfully',
    };
  }
}
