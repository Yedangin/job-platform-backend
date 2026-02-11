/*
  Warnings:

  - You are about to drop the `corporate_registrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member_identity_verifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sanctions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `social_auths` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_informations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('INDIVIDUAL', 'CORPORATE', 'ADMIN');

-- CreateEnum
CREATE TYPE "VerificationMethod" AS ENUM ('CEO_MATCH', 'CORP_EMAIL', 'DOCUMENT_MANUAL');

-- CreateEnum
CREATE TYPE "CompanySizeType" AS ENUM ('SME', 'MID', 'LARGE', 'STARTUP');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "DesiredJobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERN');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('HIGH_SCHOOL', 'COLLEGE', 'BACHELOR', 'MASTER', 'DOCTOR');

-- CreateEnum
CREATE TYPE "KoreanFluencyLevel" AS ENUM ('NONE', 'BASIC', 'INTERMEDIATE', 'ADVANCED', 'NATIVE');

-- CreateEnum
CREATE TYPE "GraduationStatus" AS ENUM ('GRADUATED', 'ATTENDING', 'LEAVE', 'DROPOUT');

-- DropForeignKey
ALTER TABLE "corporate_registrations" DROP CONSTRAINT "corporate_registrations_is_verified_by_fkey";

-- DropForeignKey
ALTER TABLE "corporate_registrations" DROP CONSTRAINT "corporate_registrations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "member_identity_verifications" DROP CONSTRAINT "member_identity_verifications_is_verified_by_fkey";

-- DropForeignKey
ALTER TABLE "member_identity_verifications" DROP CONSTRAINT "member_identity_verifications_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sanctions" DROP CONSTRAINT "sanctions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "social_auths" DROP CONSTRAINT "social_auths_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_informations" DROP CONSTRAINT "user_informations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_user_id_fkey";

-- DropTable
DROP TABLE "corporate_registrations";

-- DropTable
DROP TABLE "member_identity_verifications";

-- DropTable
DROP TABLE "sanctions";

-- DropTable
DROP TABLE "social_auths";

-- DropTable
DROP TABLE "user_informations";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "verification_tokens";

-- DropEnum
DROP TYPE "SanctionType";

-- DropEnum
DROP TYPE "UserRole";

-- DropEnum
DROP TYPE "UserStatus";

-- DropEnum
DROP TYPE "SocialProvider";

-- CreateEnum
CREATE TYPE "SocialProvider" AS ENUM ('NONE', 'GOOGLE', 'FACEBOOK', 'KAKAO', 'APPLE');

-- CreateTable
CREATE TABLE "users_auth" (
    "auth_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "social_provider" "SocialProvider" NOT NULL DEFAULT 'NONE',
    "social_provider_id" TEXT,
    "user_type" "UserType" NOT NULL DEFAULT 'INDIVIDUAL',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "users_auth_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "profiles_corporate" (
    "company_id" BIGSERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "biz_reg_number" TEXT NOT NULL,
    "company_name_official" TEXT NOT NULL,
    "ceo_name" TEXT NOT NULL,
    "founding_date" DATE,
    "manager_name" TEXT NOT NULL,
    "manager_phone" TEXT NOT NULL,
    "manager_email" TEXT NOT NULL,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verification_method" "VerificationMethod",
    "proof_document_url" TEXT,
    "brand_name" TEXT,
    "logo_image_url" TEXT,
    "company_intro" TEXT,
    "ksic_code" TEXT NOT NULL,
    "address_road" TEXT NOT NULL,
    "company_size_type" "CompanySizeType" NOT NULL DEFAULT 'SME',
    "employee_count_korean" INTEGER NOT NULL DEFAULT 0,
    "employee_count_foreign" INTEGER NOT NULL DEFAULT 0,
    "annual_revenue" BIGINT NOT NULL DEFAULT 0,
    "is_biz_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_corporate_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "profiles_individual" (
    "individual_id" BIGSERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "address_road" TEXT,
    "visa_type" TEXT NOT NULL,
    "visa_expiry_date" DATE NOT NULL,
    "desired_job_type" "DesiredJobType" NOT NULL DEFAULT 'FULL_TIME',
    "desired_salary" INTEGER NOT NULL DEFAULT 0,
    "desired_industries" TEXT,
    "is_open_to_scout" BOOLEAN NOT NULL DEFAULT true,
    "final_education_lvl" "EducationLevel",
    "korean_fluency_lvl" "KoreanFluencyLevel",
    "total_career_months" INTEGER NOT NULL DEFAULT 0,
    "profile_image_url" TEXT,
    "resume_file_url" TEXT,
    "portfolio_url" TEXT,
    "self_intro" TEXT,
    "is_profile_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_individual_pkey" PRIMARY KEY ("individual_id")
);

-- CreateTable
CREATE TABLE "talent_access_logs" (
    "access_id" BIGSERIAL NOT NULL,
    "corporate_id" BIGINT NOT NULL,
    "individual_id" BIGINT NOT NULL,
    "accessed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "talent_access_logs_pkey" PRIMARY KEY ("access_id")
);

-- CreateTable
CREATE TABLE "profile_educations" (
    "edu_id" BIGSERIAL NOT NULL,
    "individual_id" BIGINT NOT NULL,
    "school_name" TEXT NOT NULL,
    "major_name" TEXT NOT NULL,
    "degree_level" "EducationLevel" NOT NULL,
    "start_date" DATE NOT NULL,
    "graduation_date" DATE,
    "graduation_status" "GraduationStatus" NOT NULL,
    "gps_score" DECIMAL(3,2),

    CONSTRAINT "profile_educations_pkey" PRIMARY KEY ("edu_id")
);

-- CreateTable
CREATE TABLE "profile_careers" (
    "career_id" BIGSERIAL NOT NULL,
    "individual_id" BIGINT NOT NULL,
    "company_name" TEXT NOT NULL,
    "duty_role" TEXT NOT NULL,
    "job_position" TEXT,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,

    CONSTRAINT "profile_careers_pkey" PRIMARY KEY ("career_id")
);

-- CreateTable
CREATE TABLE "profile_languages" (
    "lang_id" BIGSERIAL NOT NULL,
    "individual_id" BIGINT NOT NULL,
    "language_type" TEXT NOT NULL,
    "test_type" TEXT,
    "score_level" TEXT NOT NULL,
    "obtained_date" DATE,
    "expiry_date" DATE,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profile_languages_pkey" PRIMARY KEY ("lang_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_email_key" ON "users_auth"("email");

-- CreateIndex
CREATE INDEX "users_auth_email_idx" ON "users_auth"("email");

-- CreateIndex
CREATE INDEX "users_auth_social_provider_social_provider_id_idx" ON "users_auth"("social_provider", "social_provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_social_provider_social_provider_id_key" ON "users_auth"("social_provider", "social_provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_corporate_auth_id_key" ON "profiles_corporate"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_corporate_biz_reg_number_key" ON "profiles_corporate"("biz_reg_number");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_individual_auth_id_key" ON "profiles_individual"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "talent_access_logs_corporate_id_individual_id_key" ON "talent_access_logs"("corporate_id", "individual_id");

-- AddForeignKey
ALTER TABLE "profiles_corporate" ADD CONSTRAINT "profiles_corporate_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "users_auth"("auth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles_individual" ADD CONSTRAINT "profiles_individual_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "users_auth"("auth_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_access_logs" ADD CONSTRAINT "talent_access_logs_corporate_id_fkey" FOREIGN KEY ("corporate_id") REFERENCES "profiles_corporate"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_access_logs" ADD CONSTRAINT "talent_access_logs_individual_id_fkey" FOREIGN KEY ("individual_id") REFERENCES "profiles_individual"("individual_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_educations" ADD CONSTRAINT "profile_educations_individual_id_fkey" FOREIGN KEY ("individual_id") REFERENCES "profiles_individual"("individual_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_careers" ADD CONSTRAINT "profile_careers_individual_id_fkey" FOREIGN KEY ("individual_id") REFERENCES "profiles_individual"("individual_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_languages" ADD CONSTRAINT "profile_languages_individual_id_fkey" FOREIGN KEY ("individual_id") REFERENCES "profiles_individual"("individual_id") ON DELETE CASCADE ON UPDATE CASCADE;
