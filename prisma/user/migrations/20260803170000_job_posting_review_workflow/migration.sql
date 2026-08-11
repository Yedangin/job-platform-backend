ALTER TYPE "PostStatus" ADD VALUE IF NOT EXISTS 'SUBMITTED_REVIEW';
ALTER TYPE "PostStatus" ADD VALUE IF NOT EXISTS 'REJECTED';
ALTER TYPE "AdminActionType" ADD VALUE IF NOT EXISTS 'APPROVE';
ALTER TYPE "AdminActionType" ADD VALUE IF NOT EXISTS 'REJECT';

ALTER TABLE "job_postings"
    ADD COLUMN IF NOT EXISTS "submitted_for_review_at" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "reviewed_at" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "reviewed_by" TEXT,
    ADD COLUMN IF NOT EXISTS "rejection_reason" TEXT,
    ADD COLUMN IF NOT EXISTS "pre_suspension_status" "PostStatus";

CREATE INDEX IF NOT EXISTS "job_postings_status_submitted_for_review_at_idx"
    ON "job_postings"("status", "submitted_for_review_at");
