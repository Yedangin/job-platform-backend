import * as diagnosisMatrixData from '../data/diagnosis-matrix.json';

export interface DiagnosisPathwaySeedData {
  pathwayId: string;
  nameKo: string;
  nameEn: string;
  pathwayType: string;
  ageMin: number;
  ageMax: number;
  minEducation: string;
  allowedNationalityType: string;
  topikMin: number;
  minFund: number;
  requiresEthnicKorean: boolean;
  visaChain: string;
  estimatedMonths: number;
  estimatedCostWon: number;
  platformSupport: string;
  baseScore: number;
  note: string;
}

type DiagnosisReferenceMatrix = typeof diagnosisMatrixData & {
  pathways: DiagnosisPathwaySeedData[];
};

const matrix = diagnosisMatrixData as DiagnosisReferenceMatrix;

export const DIAGNOSIS_REFERENCE_MATRIX = {
  version: matrix.version,
  updatedAt: matrix.updatedAt,
  description: matrix.description,
  ageMatrix: matrix.ageMatrix,
  nationalityTiers: matrix.nationalityTiers,
  nationalityMultipliers: matrix.nationalityMultipliers,
  fundMultipliers: matrix.fundMultipliers,
  educationMultipliers: matrix.educationMultipliers,
  priorityWeights: matrix.priorityWeights,
  milestones: matrix.milestones,
  ageBrackets: matrix.ageBrackets,
  fundBrackets: matrix.fundBrackets,
  educationLevels: matrix.educationLevels,
  priorityOptions: matrix.priorityOptions,
  feasibilityLabels: matrix.feasibilityLabels,
} as const;

export const DEFAULT_DIAGNOSIS_PATHWAYS: DiagnosisPathwaySeedData[] =
  matrix.pathways;
