/**
 * 교육기관 서비스 / Educational institutions service
 *
 * 대학교 + 어학당 검색 및 조회
 * University + language institute search and retrieval
 */

import { Injectable, Logger } from '@nestjs/common';
import { AuthPrismaService } from '../../../../libs/common/src';
import {
  InstitutionSearchDto,
  InstitutionDto,
  InstitutionType,
} from './dto/institution.dto';

@Injectable()
export class InstitutionsService {
  private readonly logger = new Logger(InstitutionsService.name);

  constructor(private readonly prisma: AuthPrismaService) {}

  /**
   * 교육기관 검색 (자동완성용) / Search institutions (for autocomplete)
   *
   * 검색 로직:
   * 1. 교육기관명 (한글, 영문) LIKE 검색
   * 2. searchKeywords 배열 내 매칭
   * 3. type 필터 (선택사항)
   * 4. 관련도 순 정렬 (정확히 일치 > 시작 일치 > 포함)
   *
   * @param dto - 검색 파라미터 / Search parameters
   * @returns 매칭된 교육기관 목록 / Matched institutions list
   */
  async search(dto: InstitutionSearchDto): Promise<InstitutionDto[]> {
    const { q, type, limit = 10 } = dto;

    this.logger.log(
      `교육기관 검색: "${q}" (type: ${type || 'all'}, limit: ${limit})`,
    );

    try {
      // Prisma의 full-text search는 복잡하므로, 간단하게 OR 조건으로 검색
      const institutions = await this.prisma.educationalInstitution.findMany({
        where: {
          isActive: true,
          ...(type && { type }),
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { nameEn: { contains: q, mode: 'insensitive' } },
            {
              searchKeywords: {
                has: q, // 정확히 일치하는 키워드
              },
            },
          ],
        },
        orderBy: [
          // 정확히 일치하는 경우 우선
          // (Prisma에서는 case when 정렬이 어려우므로, 애플리케이션 레벨에서 정렬)
        ],
        take: limit * 2, // 애플리케이션 레벨 정렬을 위해 더 많이 가져옴
      });

      // 관련도 계산 및 정렬
      const scored = institutions.map((inst) => {
        let score = 0;

        // 정확히 일치: 100점
        if (inst.name.toLowerCase() === q.toLowerCase()) score += 100;
        if (inst.nameEn?.toLowerCase() === q.toLowerCase()) score += 100;
        if (
          inst.searchKeywords.some((k) => k.toLowerCase() === q.toLowerCase())
        )
          score += 100;

        // 시작 일치: 50점
        if (inst.name.toLowerCase().startsWith(q.toLowerCase())) score += 50;
        if (inst.nameEn?.toLowerCase().startsWith(q.toLowerCase())) score += 50;

        // 포함: 10점
        if (inst.name.toLowerCase().includes(q.toLowerCase())) score += 10;
        if (inst.nameEn?.toLowerCase().includes(q.toLowerCase())) score += 10;

        // searchKeywords 포함: 각 5점
        inst.searchKeywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(q.toLowerCase())) score += 5;
        });

        return { ...inst, score };
      });

      // 점수 기준 정렬 후 상위 limit개 반환
      const sorted = scored.sort((a, b) => b.score - a.score).slice(0, limit);

      return sorted.map((inst) => ({
        id: Number(inst.id),
        name: inst.name,
        nameEn: inst.nameEn || undefined,
        type: inst.type as InstitutionType,
        address: inst.address,
        addressDetail: inst.addressDetail || undefined,
        latitude: parseFloat(inst.latitude.toString()),
        longitude: parseFloat(inst.longitude.toString()),
        isMetroArea: inst.isMetroArea,
        affiliatedUniversity: inst.affiliatedUniversity || undefined,
        searchKeywords: inst.searchKeywords,
      }));
    } catch (error) {
      this.logger.error(`교육기관 검색 실패: ${error.message}`, error.stack);
      return [];
    }
  }

  /**
   * ID로 교육기관 조회 / Find institution by ID
   *
   * @param id - 교육기관 ID / Institution ID
   * @returns 교육기관 정보 / Institution info
   */
  async findById(id: number): Promise<InstitutionDto | null> {
    try {
      const inst = await this.prisma.educationalInstitution.findUnique({
        where: { id: BigInt(id) },
      });

      if (!inst) {
        return null;
      }

      return {
        id: Number(inst.id),
        name: inst.name,
        nameEn: inst.nameEn || undefined,
        type: inst.type as InstitutionType,
        address: inst.address,
        addressDetail: inst.addressDetail || undefined,
        latitude: parseFloat(inst.latitude.toString()),
        longitude: parseFloat(inst.longitude.toString()),
        isMetroArea: inst.isMetroArea,
        affiliatedUniversity: inst.affiliatedUniversity || undefined,
        searchKeywords: inst.searchKeywords,
      };
    } catch (error) {
      this.logger.error(
        `교육기관 조회 실패 (ID: ${id}): ${error.message}`,
        error.stack,
      );
      return null;
    }
  }

  /**
   * 이름으로 교육기관 조회 (정확히 일치) / Find institution by exact name
   *
   * @param name - 교육기관명 / Institution name
   * @returns 교육기관 정보 / Institution info
   */
  async findByName(name: string): Promise<InstitutionDto | null> {
    try {
      const inst = await this.prisma.educationalInstitution.findFirst({
        where: {
          isActive: true,
          OR: [
            { name: { equals: name, mode: 'insensitive' } },
            { nameEn: { equals: name, mode: 'insensitive' } },
          ],
        },
      });

      if (!inst) {
        return null;
      }

      return {
        id: Number(inst.id),
        name: inst.name,
        nameEn: inst.nameEn || undefined,
        type: inst.type as InstitutionType,
        address: inst.address,
        addressDetail: inst.addressDetail || undefined,
        latitude: parseFloat(inst.latitude.toString()),
        longitude: parseFloat(inst.longitude.toString()),
        isMetroArea: inst.isMetroArea,
        affiliatedUniversity: inst.affiliatedUniversity || undefined,
        searchKeywords: inst.searchKeywords,
      };
    } catch (error) {
      this.logger.error(
        `교육기관 조회 실패 (name: ${name}): ${error.message}`,
        error.stack,
      );
      return null;
    }
  }
}
