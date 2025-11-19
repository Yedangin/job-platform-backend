-- CreateEnum
CREATE TYPE "JobPostStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AppliedStatus" AS ENUM ('PENDING', 'CONFIRMED', 'INTERVIEW', 'SUCCESS', 'REJECTED');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('PENDING', 'STARTING', 'SUCCESS', 'REJECTED', 'PENALTY');

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50),
    "description" VARCHAR(255),
    "parent_category_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_posts" (
    "id" TEXT NOT NULL,
    "corporate_id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "location" VARCHAR(255),
    "salary_range" VARCHAR(255),
    "category_id" TEXT,
    "fee_type" VARCHAR(50),
    "status" "JobPostStatus" NOT NULL DEFAULT 'PENDING',
    "approved_by" TEXT,
    "applies_count" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expired_at" TIMESTAMP(3),

    CONSTRAINT "job_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applies" (
    "id" TEXT NOT NULL,
    "job_post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_info_id" TEXT,
    "is_reviewed" BOOLEAN NOT NULL DEFAULT false,
    "status" "AppliedStatus" NOT NULL DEFAULT 'PENDING',
    "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" TEXT NOT NULL,
    "job_post_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "corporate_id" TEXT NOT NULL,
    "room_id" TEXT,
    "interview_date" TIMESTAMP(3),
    "status" "InterviewStatus" NOT NULL DEFAULT 'PENDING',
    "failure_reason" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "interview_id" TEXT NOT NULL,
    "reviewer_id" TEXT NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "reporter_id" TEXT NOT NULL,
    "reported_user_id" TEXT NOT NULL,
    "reason" TEXT,
    "status" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "categories_name_idx" ON "categories"("name");

-- CreateIndex
CREATE INDEX "job_posts_category_id_idx" ON "job_posts"("category_id");

-- CreateIndex
CREATE INDEX "Job Search" ON "job_posts"("title", "description");

-- CreateIndex
CREATE INDEX "job_posts_corporate_id_idx" ON "job_posts"("corporate_id");

-- CreateIndex
CREATE INDEX "job_posts_fee_type_idx" ON "job_posts"("fee_type");

-- CreateIndex
CREATE INDEX "applies_status_idx" ON "applies"("status");

-- CreateIndex
CREATE INDEX "applies_job_post_id_idx" ON "applies"("job_post_id");

-- CreateIndex
CREATE INDEX "interviews_interview_date_idx" ON "interviews"("interview_date");

-- CreateIndex
CREATE INDEX "interviews_status_idx" ON "interviews"("status");

-- CreateIndex
CREATE INDEX "interviews_failure_reason_idx" ON "interviews"("failure_reason");

-- CreateIndex
CREATE INDEX "interviews_member_id_idx" ON "interviews"("member_id");

-- CreateIndex
CREATE INDEX "interviews_job_post_id_idx" ON "interviews"("job_post_id");

-- CreateIndex
CREATE INDEX "interviews_corporate_id_idx" ON "interviews"("corporate_id");

-- CreateIndex
CREATE INDEX "interviews_created_at_idx" ON "interviews"("created_at");

-- CreateIndex
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- CreateIndex
CREATE INDEX "reviews_interview_id_idx" ON "reviews"("interview_id");

-- CreateIndex
CREATE INDEX "reviews_reviewer_id_idx" ON "reviews"("reviewer_id");

-- CreateIndex
CREATE INDEX "reviews_created_at_idx" ON "reviews"("created_at");

-- CreateIndex
CREATE INDEX "reports_status_idx" ON "reports"("status");

-- CreateIndex
CREATE INDEX "reports_reason_idx" ON "reports"("reason");

-- CreateIndex
CREATE INDEX "reports_created_at_idx" ON "reports"("created_at");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_posts" ADD CONSTRAINT "job_posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applies" ADD CONSTRAINT "applies_job_post_id_fkey" FOREIGN KEY ("job_post_id") REFERENCES "job_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_job_post_id_fkey" FOREIGN KEY ("job_post_id") REFERENCES "job_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_interview_id_fkey" FOREIGN KEY ("interview_id") REFERENCES "interviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
