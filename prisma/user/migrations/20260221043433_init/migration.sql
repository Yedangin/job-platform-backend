/*
  Warnings:

  - You are about to drop the column `full_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_emailed_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_phone_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_info_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wallet_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `corporate_registrations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `member_identity_verifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sanctions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_informations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,provider_id]` on the table `social_auths` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userType` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CORPORATE', 'INDIVIDUAL');

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

-- DropIndex
DROP INDEX "social_auths_user_id_key";

-- DropIndex
DROP INDEX "users_email_idx";

-- DropIndex
DROP INDEX "users_full_name_idx";

-- DropIndex
DROP INDEX "users_is_emailed_verified_idx";

-- DropIndex
DROP INDEX "users_is_phone_verified_idx";

-- DropIndex
DROP INDEX "users_phone_idx";

-- DropIndex
DROP INDEX "users_role_idx";

-- DropIndex
DROP INDEX "users_status_idx";

-- DropIndex
DROP INDEX "users_user_info_id_key";

-- DropIndex
DROP INDEX "users_wallet_id_key";

-- AlterTable
ALTER TABLE "social_auths" ALTER COLUMN "provider_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "social_auths_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "full_name",
DROP COLUMN "is_emailed_verified",
DROP COLUMN "is_phone_verified",
DROP COLUMN "phone",
DROP COLUMN "role",
DROP COLUMN "status",
DROP COLUMN "user_info_id",
DROP COLUMN "wallet_id",
ADD COLUMN     "userType" "UserType" NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "corporate_registrations";

-- DropTable
DROP TABLE "member_identity_verifications";

-- DropTable
DROP TABLE "sanctions";

-- DropTable
DROP TABLE "user_informations";

-- DropTable
DROP TABLE "verification_tokens";

-- DropEnum
DROP TYPE "SanctionType";

-- DropEnum
DROP TYPE "UserRole";

-- DropEnum
DROP TYPE "UserStatus";

-- DropEnum
DROP TYPE "VerificationStatus";

-- CreateTable
CREATE TABLE "profiles_corporate" (
    "company_id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "industry_code" TEXT NOT NULL,
    "business_reg_no" TEXT NOT NULL,

    CONSTRAINT "profiles_corporate_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "profiles_individual" (
    "individual_id" BIGSERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "visa_status" TEXT NOT NULL,
    "is_visa_verified" BOOLEAN NOT NULL DEFAULT false,
    "korean_level" INTEGER NOT NULL DEFAULT 0,

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

-- CreateIndex
CREATE UNIQUE INDEX "profiles_corporate_user_id_key" ON "profiles_corporate"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_individual_user_id_key" ON "profiles_individual"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "talent_access_logs_corporate_id_individual_id_key" ON "talent_access_logs"("corporate_id", "individual_id");

-- CreateIndex
CREATE UNIQUE INDEX "social_auths_provider_provider_id_key" ON "social_auths"("provider", "provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "profiles_corporate" ADD CONSTRAINT "profiles_corporate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles_individual" ADD CONSTRAINT "profiles_individual_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_access_logs" ADD CONSTRAINT "talent_access_logs_corporate_id_fkey" FOREIGN KEY ("corporate_id") REFERENCES "profiles_corporate"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "talent_access_logs" ADD CONSTRAINT "talent_access_logs_individual_id_fkey" FOREIGN KEY ("individual_id") REFERENCES "profiles_individual"("individual_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_auths" ADD CONSTRAINT "social_auths_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
