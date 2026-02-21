/*
  Warnings:

  - You are about to drop the `applies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('PART_TIME', 'FULL_TIME');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('UPPER', 'MIDDLE', 'LOWER');

-- CreateEnum
CREATE TYPE "InterviewType" AS ENUM ('OFFLINE', 'ONLINE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'INTERVIEW_REQUESTED', 'COORDINATION_NEEDED', 'CONFIRMED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('EMPLOYER', 'APPLICANT');

-- DropForeignKey
ALTER TABLE "applies" DROP CONSTRAINT "applies_job_post_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_category_id_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_job_post_id_fkey";

-- DropForeignKey
ALTER TABLE "job_posts" DROP CONSTRAINT "job_posts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_interview_id_fkey";

-- DropTable
DROP TABLE "applies";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "interviews";

-- DropTable
DROP TABLE "job_posts";

-- DropTable
DROP TABLE "reports";

-- DropTable
DROP TABLE "reviews";

-- DropEnum
DROP TYPE "AppliedStatus";

-- DropEnum
DROP TYPE "InterviewStatus";

-- DropEnum
DROP TYPE "JobPostStatus";

-- CreateTable
CREATE TABLE "industry_visa_rules" (
    "id" SERIAL NOT NULL,
    "industry_code" TEXT NOT NULL,
    "allowed_visa" TEXT NOT NULL,

    CONSTRAINT "industry_visa_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_postings" (
    "job_id" BIGSERIAL NOT NULL,
    "corporate_id" BIGINT NOT NULL,
    "board_type" "BoardType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "work_content_img" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'OPEN',
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "premium_start_at" TIMESTAMP(3),
    "premium_end_at" TIMESTAMP(3),
    "closing_date" TIMESTAMP(3),
    "is_recruitment_end" BOOLEAN NOT NULL DEFAULT false,
    "display_address" TEXT NOT NULL,
    "actual_address" TEXT NOT NULL,
    "work_intensity" "Intensity" NOT NULL DEFAULT 'MIDDLE',
    "benefits_json" JSONB,
    "allowed_visas" TEXT NOT NULL,
    "min_korean_level" INTEGER NOT NULL DEFAULT 0,
    "contact_name" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "interview_method" "InterviewType" NOT NULL DEFAULT 'OFFLINE',
    "interview_place" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_postings_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "job_attributes_alba" (
    "job_id" BIGINT NOT NULL,
    "hourly_wage" INTEGER NOT NULL,
    "work_period" TEXT,
    "work_days_mask" TEXT NOT NULL,
    "work_time_start" TIME,
    "work_time_end" TIME,

    CONSTRAINT "job_attributes_alba_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "job_attributes_fulltime" (
    "job_id" BIGINT NOT NULL,
    "salary_min" INTEGER,
    "salary_max" INTEGER,
    "experience_level" TEXT NOT NULL,
    "education_level" TEXT NOT NULL,

    CONSTRAINT "job_attributes_fulltime_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "interview_slots" (
    "slot_id" BIGSERIAL NOT NULL,
    "job_id" BIGINT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "interview_slots_pkey" PRIMARY KEY ("slot_id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "app_id" BIGSERIAL NOT NULL,
    "job_id" BIGINT NOT NULL,
    "applicant_id" BIGINT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "selected_slot_id" BIGINT,
    "proposed_by" "ActorType",
    "proposed_time" TIMESTAMP(3),
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("app_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "industry_visa_rules_industry_code_allowed_visa_key" ON "industry_visa_rules"("industry_code", "allowed_visa");

-- AddForeignKey
ALTER TABLE "job_attributes_alba" ADD CONSTRAINT "job_attributes_alba_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_attributes_fulltime" ADD CONSTRAINT "job_attributes_fulltime_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interview_slots" ADD CONSTRAINT "interview_slots_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job_postings"("job_id") ON DELETE RESTRICT ON UPDATE CASCADE;
