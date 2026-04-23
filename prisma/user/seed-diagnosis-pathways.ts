import { PrismaClient } from '../../generated/prisma-user';
import {
  DEFAULT_DIAGNOSIS_PATHWAYS,
  DIAGNOSIS_REFERENCE_MATRIX,
} from '../../apps/job-platform-backend/src/diagnosis/diagnosis-reference.data';

const prisma = new PrismaClient();

export async function seedDiagnosisPathways() {
  const referenceDate = new Date(DIAGNOSIS_REFERENCE_MATRIX.updatedAt);
  let created = 0;
  let updated = 0;

  for (const pathway of DEFAULT_DIAGNOSIS_PATHWAYS) {
    const existing = await prisma.diagnosisPathway.findUnique({
      where: { pathwayId: pathway.pathwayId },
      select: { id: true },
    });

    await prisma.diagnosisPathway.upsert({
      where: { pathwayId: pathway.pathwayId },
      update: {
        nameKo: pathway.nameKo,
        nameEn: pathway.nameEn,
        pathwayType: pathway.pathwayType,
        ageMin: pathway.ageMin,
        ageMax: pathway.ageMax,
        minEducation: pathway.minEducation,
        allowedNationalityType: pathway.allowedNationalityType,
        topikMin: pathway.topikMin,
        minFund: pathway.minFund,
        requiresEthnicKorean: pathway.requiresEthnicKorean,
        visaChain: pathway.visaChain,
        estimatedMonths: pathway.estimatedMonths,
        estimatedCostWon: pathway.estimatedCostWon,
        platformSupport: pathway.platformSupport,
        baseScore: pathway.baseScore,
        note: pathway.note,
        isActive: true,
        lastUpdatedAt: referenceDate,
        lastUpdatedReason: '초기 JSON 데이터 이관',
      },
      create: {
        pathwayId: pathway.pathwayId,
        nameKo: pathway.nameKo,
        nameEn: pathway.nameEn,
        pathwayType: pathway.pathwayType,
        ageMin: pathway.ageMin,
        ageMax: pathway.ageMax,
        minEducation: pathway.minEducation,
        allowedNationalityType: pathway.allowedNationalityType,
        topikMin: pathway.topikMin,
        minFund: pathway.minFund,
        requiresEthnicKorean: pathway.requiresEthnicKorean,
        visaChain: pathway.visaChain,
        estimatedMonths: pathway.estimatedMonths,
        estimatedCostWon: pathway.estimatedCostWon,
        platformSupport: pathway.platformSupport,
        baseScore: pathway.baseScore,
        note: pathway.note,
        isActive: true,
        lastUpdatedAt: referenceDate,
        lastUpdatedReason: '초기 JSON 데이터 이관',
      },
    });

    if (existing) updated += 1;
    else created += 1;
  }

  console.log(
    `[Seed] 진단 경로 시드 완료 / Diagnosis pathways seeded: created=${created}, updated=${updated}`,
  );
}

async function main() {
  await seedDiagnosisPathways();
}

if (require.main === module) {
  main()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
