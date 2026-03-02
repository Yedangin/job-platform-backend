/**
 * 비자 플래너 시드 데이터 서비스 / Visa planner seed data service
 * 대학 순위, 비자 수입 참조, 인접 전공-직종 매핑 초기 데이터 삽입
 * Seeds university rankings, visa income references, and adjacent major-occupation mappings
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AuthPrismaService } from 'libs/common/src';

@Injectable()
export class VisaPlannerSeedService implements OnModuleInit {
  private readonly logger = new Logger(VisaPlannerSeedService.name);

  constructor(private readonly prisma: AuthPrismaService) {}

  async onModuleInit() {
    await this.seedAdjacentMajorOccupation();
    await this.seedVisaIncomeReferences();
    // 대학 순위는 별도 CSV import로 처리 / University rankings seeded via separate CSV import
  }

  /**
   * 인접 전공-직종 매핑 시드 / Seed adjacent major-occupation mappings
   * 양방향으로 저장 (A→B, B→A) / Stored bidirectionally
   */
  private async seedAdjacentMajorOccupation() {
    const pairs: [string, string, number][] = [
      ['IT_SW', 'ELEC', 2.5],
      ['MECH', 'SHIP', 2.5],
      ['CHEM', 'ENV', 2.5],
      ['BIZ', 'LAW', 2.5],
      ['DESIGN_ART', 'IT_SW', 2.5],
    ];

    let created = 0;
    for (const [a, b, bonus] of pairs) {
      // 양방향 삽입 / Insert both directions
      for (const [catA, catB] of [
        [a, b],
        [b, a],
      ]) {
        try {
          await this.prisma.adjacentMajorOccupation.upsert({
            where: {
              categoryA_categoryB: { categoryA: catA, categoryB: catB },
            },
            update: { alignBonus: bonus },
            create: { categoryA: catA, categoryB: catB, alignBonus: bonus },
          });
          created++;
        } catch {
          // 무시 — 이미 존재 / Ignore — already exists
        }
      }
    }
    this.logger.log(
      `인접 전공-직종 매핑 시드 완료: ${created}건 / Adjacent mapping seeded: ${created} rows`,
    );
  }

  /**
   * 비자 수입 참조 시드 / Seed visa income references
   * 통계청/고용부 외국인 근로자 실태조사 기반 / Based on statistics
   */
  private async seedVisaIncomeReferences() {
    const refs: {
      visaCode: string;
      visaNameKo: string;
      avgAnnualIncome: number;
      incomeSource: string;
      incomeNote?: string;
    }[] = [
      {
        visaCode: 'E-5',
        visaNameKo: '전문직업',
        avgAnnualIncome: 65_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '변호사/회계사/의사 — 전문자격',
      },
      {
        visaCode: 'E-1',
        visaNameKo: '교수',
        avgAnnualIncome: 55_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '대학교/연구기관 교원',
      },
      {
        visaCode: 'E-3',
        visaNameKo: '연구',
        avgAnnualIncome: 50_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '연구소/R&D',
      },
      {
        visaCode: 'E-4',
        visaNameKo: '기술지도',
        avgAnnualIncome: 48_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '기술이전 전문가',
      },
      {
        visaCode: 'E-7-1',
        visaNameKo: '전문인력',
        avgAnnualIncome: 42_000_000,
        incomeSource: '통계청 2025',
        incomeNote: 'IT/엔지니어/전문직 — 경력 기반',
      },
      {
        visaCode: 'E-7-2',
        visaNameKo: '준전문',
        avgAnnualIncome: 35_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '연구보조/기술지원',
      },
      {
        visaCode: 'E-7-4',
        visaNameKo: '숙련기능',
        avgAnnualIncome: 32_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '숙련 기능공 — 점수제',
      },
      {
        visaCode: 'F-2-7',
        visaNameKo: '점수제',
        avgAnnualIncome: 38_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '거주 자격 — 직종 제한 없음',
      },
      {
        visaCode: 'E-9',
        visaNameKo: '고용허가제',
        avgAnnualIncome: 28_000_000,
        incomeSource: '고용부 2025',
        incomeNote: '제조/건설/농업 — 정부 배정',
      },
      {
        visaCode: 'H-2',
        visaNameKo: '방문취업',
        avgAnnualIncome: 26_000_000,
        incomeSource: '고용부 2025',
        incomeNote: '동포 — 단순노무 포함',
      },
      {
        visaCode: 'E-2',
        visaNameKo: '회화지도',
        avgAnnualIncome: 30_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '외국어 교육',
      },
      {
        visaCode: 'D-2',
        visaNameKo: '유학',
        avgAnnualIncome: 12_000_000,
        incomeSource: '통계청 2025',
        incomeNote: '아르바이트 기준 (주 20시간)',
      },
    ];

    let created = 0;
    for (const ref of refs) {
      try {
        await this.prisma.visaIncomeReference.upsert({
          where: { visaCode: ref.visaCode },
          update: {
            visaNameKo: ref.visaNameKo,
            avgAnnualIncome: ref.avgAnnualIncome,
            incomeSource: ref.incomeSource,
            incomeNote: ref.incomeNote ?? null,
            updatedYear: 2025,
          },
          create: {
            ...ref,
            incomeNote: ref.incomeNote ?? null,
            updatedYear: 2025,
          },
        });
        created++;
      } catch {
        // 무시 / Ignore
      }
    }
    this.logger.log(
      `비자 수입 참조 시드 완료: ${created}건 / Visa income refs seeded: ${created} rows`,
    );
  }
}
