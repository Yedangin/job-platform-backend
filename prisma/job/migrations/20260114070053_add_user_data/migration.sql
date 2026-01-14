-- AlterTable
ALTER TABLE "applies" ADD COLUMN     "member_cv_form" TEXT,
ADD COLUMN     "member_email" VARCHAR(255),
ADD COLUMN     "member_full_name" VARCHAR(255),
ADD COLUMN     "member_phone" VARCHAR(50);

-- AlterTable
ALTER TABLE "interviews" ADD COLUMN     "corporate_name" VARCHAR(255),
ADD COLUMN     "member_email" VARCHAR(255),
ADD COLUMN     "member_full_name" VARCHAR(255),
ADD COLUMN     "member_phone" VARCHAR(50);

-- AlterTable
ALTER TABLE "job_posts" ADD COLUMN     "corporate_name" VARCHAR(255);
