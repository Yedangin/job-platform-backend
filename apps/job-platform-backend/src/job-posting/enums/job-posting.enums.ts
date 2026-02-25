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

// ── Application & Interview ──────────────────────────────────────────

/** Mirrors prisma/job/job.schema.prisma → ApplicationStatus */
export enum ApplicationStatus {
  PENDING = 'PENDING',
  INTERVIEW_REQUESTED = 'INTERVIEW_REQUESTED',
  COORDINATION_NEEDED = 'COORDINATION_NEEDED',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

/** Mirrors prisma/job/job.schema.prisma → ActorType */
export enum ActorType {
  EMPLOYER = 'EMPLOYER',
  APPLICANT = 'APPLICANT',
}

// ── Payment ──────────────────────────────────────────────────────────

/** Mirrors prisma/payment/payment.schema.prisma → PaymentStatus */
export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

// ── Admin ────────────────────────────────────────────────────────────

/** Admin moderation actions on job postings */
export enum AdminActionType {
  SUSPEND = 'SUSPEND',
  UNSUSPEND = 'UNSUSPEND',
  FEATURE = 'FEATURE',
  UNFEATURE = 'UNFEATURE',
}

// ── Notifications ────────────────────────────────────────────────────

/** Result type sent in pass/fail notifications to applicants */
export enum NotificationResultType {
  PASS = 'PASS',
  FAIL = 'FAIL',
}
