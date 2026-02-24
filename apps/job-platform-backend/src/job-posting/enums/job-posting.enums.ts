/**
 * TypeScript enums mirroring Prisma schema enums for job-posting module.
 * Used by DTOs for @IsEnum validation + Swagger documentation.
 */

export enum BoardType {
  PART_TIME = 'PART_TIME',
  FULL_TIME = 'FULL_TIME',
}

export enum TierType {
  PREMIUM = 'PREMIUM',
  STANDARD = 'STANDARD',
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
}

export enum EmploymentSubType {
  CONTRACT = 'CONTRACT',
  PERMANENT = 'PERMANENT',
  INTERNSHIP = 'INTERNSHIP',
}

export enum ApplicationMethod {
  PLATFORM = 'PLATFORM',
  WEBSITE = 'WEBSITE',
  EMAIL = 'EMAIL',
}

export enum Intensity {
  UPPER = 'UPPER',
  MIDDLE = 'MIDDLE',
  LOWER = 'LOWER',
}

export enum InterviewType {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}
