import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AuthPrismaService,
  PaginationResult,
  PaginationService,
} from '@in-job/common';
import {
  AllSanctionsWithMetaResponse,
  CreateSanctionRequest,
  DeleteSanctionResponse,
  Sanction,
  SanctionResponse,
  SanctionType,
  SingleSanctionResponse,
  UpdateSanctionRequest,
} from 'types/auth/sanction';

@Injectable()
export class SanctionService {
  constructor(
    private readonly prisma: AuthPrismaService,
    private readonly paginationService: PaginationService
  ) {}

  private mapSanctionType(type: string): SanctionType {
    const typeMap: Record<string, SanctionType> = {
      SUSPENSION: SanctionType.SUSPENSION,
      WARNING: SanctionType.WARNING,
      BANNED: SanctionType.BANNED,
    };
    return typeMap[type] || SanctionType.SANCTION_TYPE_UNSPECIFIED;
  }

  private mapSanctionToResponse(sanction: Sanction) {
    return {
      id: sanction.id,
      userId: sanction.userId,
      sanctionType: this.mapSanctionType(sanction.sanctionType as unknown as string),
      reason: sanction.reason || undefined,
      startDate: sanction.startDate?.toString(),
      endDate: sanction.endDate?.toString(),
      createdAt: sanction.createdAt.toString(),
    };
  }

  async findAll(basicQuery: any): Promise<AllSanctionsWithMetaResponse> {
    const searchColumn = ['id', 'userId', 'reason'];

    const result = await this.paginationService.paginate<Sanction>(
      basicQuery,
      this.prisma.sanction,
      searchColumn,
      {
        user: true
      }
    );

    const mappedData = (result as PaginationResult<Sanction>)?.data.map(
      (sanction) => this.mapSanctionToResponse(sanction)
    );

    return { data: mappedData, meta: result.meta };
  }

  async findOne(sanctionId: string): Promise<SingleSanctionResponse> {
    const sanction = await this.prisma.sanction.findUnique({
      where: { id: sanctionId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        },
      },
    });

    if (!sanction) {
      throw new NotFoundException(`Sanction with ID ${sanctionId} not found`);
    }

    return {
      message: 'Sanction retrieved successfully',
      sanction: {
        id: sanction.id,
        userId: sanction.userId,
        sanctionType: this.mapSanctionType(sanction.sanctionType as unknown as string),
        reason: sanction.reason || undefined,
        startDate: sanction.startDate?.toString(),
        endDate: sanction.endDate?.toString(),
        createdAt: sanction.createdAt.toString(),
      },
    };
  }

  async create(
    createSanctionDto: CreateSanctionRequest
  ): Promise<SanctionResponse> {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createSanctionDto.userId },
    });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${createSanctionDto.userId} not found`
      );
    }

    await this.prisma.sanction.create({
      data: {
        userId: createSanctionDto.userId,
        sanctionType: createSanctionDto.sanctionType as any,
        reason: createSanctionDto.reason,
        startDate: createSanctionDto.startDate
          ? new Date(createSanctionDto.startDate)
          : null,
        endDate: createSanctionDto.endDate
          ? new Date(createSanctionDto.endDate)
          : null,
      },
    });

    return {
      success: true,
      message: 'Sanction created successfully',
    };
  }

  async update(
    updateSanctionDto: UpdateSanctionRequest
  ): Promise<SanctionResponse> {
    const { sanctionId } = updateSanctionDto;
    const existingSanction = await this.prisma.sanction.findUnique({
      where: { id: sanctionId },
    });

    if (!existingSanction) {
      throw new NotFoundException(`Sanction with ID ${sanctionId} not found`);
    }

    const updateData: any = {};

    if (updateSanctionDto.sanctionType !== undefined)
      updateData.sanctionType = updateSanctionDto.sanctionType;
    if (updateSanctionDto.reason !== undefined)
      updateData.reason = updateSanctionDto.reason;
    if (updateSanctionDto.startDate !== undefined)
      updateData.startDate = updateSanctionDto.startDate
        ? new Date(updateSanctionDto.startDate)
        : null;
    if (updateSanctionDto.endDate !== undefined)
      updateData.endDate = updateSanctionDto.endDate
        ? new Date(updateSanctionDto.endDate)
        : null;

    await this.prisma.sanction.update({
      where: { id: sanctionId },
      data: updateData,
    });

    return {
      success: true,
      message: 'Sanction updated successfully',
    };
  }

  async remove(sanctionId: string): Promise<DeleteSanctionResponse> {
    const existingSanction = await this.prisma.sanction.findUnique({
      where: { id: sanctionId },
    });

    if (!existingSanction) {
      throw new NotFoundException(`Sanction with ID ${sanctionId} not found`);
    }

    await this.prisma.sanction.delete({
      where: { id: sanctionId },
    });

    return {
      success: true,
      message: 'Sanction deleted successfully',
    };
  }
}
