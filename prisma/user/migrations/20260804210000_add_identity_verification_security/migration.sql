-- CreateEnum
CREATE TYPE "IdentityProvider" AS ENUM ('PORTONE_DANAL');

-- CreateEnum
CREATE TYPE "IdentityPurpose" AS ENUM ('CORPORATE_MANAGER');

-- CreateEnum
CREATE TYPE "IdentityAttemptStatus" AS ENUM ('READY', 'VERIFIED', 'FAILED', 'EXPIRED');

-- CreateTable
CREATE TABLE "identity_verification_attempts" (
    "attempt_id" BIGSERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "provider" "IdentityProvider" NOT NULL DEFAULT 'PORTONE_DANAL',
    "purpose" "IdentityPurpose" NOT NULL,
    "provider_verification_id" VARCHAR(80) NOT NULL,
    "state_hash" CHAR(64) NOT NULL,
    "status" "IdentityAttemptStatus" NOT NULL DEFAULT 'READY',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "verified_at" TIMESTAMP(3),
    "consumed_at" TIMESTAMP(3),
    "failure_code" VARCHAR(100),
    "requester_ip_hash" CHAR(64),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "identity_verification_attempts_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateTable
CREATE TABLE "verified_identities" (
    "verified_identity_id" BIGSERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "provider" "IdentityProvider" NOT NULL DEFAULT 'PORTONE_DANAL',
    "purpose" "IdentityPurpose" NOT NULL,
    "provider_verification_id" VARCHAR(80) NOT NULL,
    "ci_ciphertext" TEXT NOT NULL,
    "ci_iv" VARCHAR(24) NOT NULL,
    "ci_tag" VARCHAR(32) NOT NULL,
    "ci_lookup_hash" CHAR(64) NOT NULL,
    "di_ciphertext" TEXT NOT NULL,
    "di_iv" VARCHAR(24) NOT NULL,
    "di_tag" VARCHAR(32) NOT NULL,
    "di_lookup_hash" CHAR(64) NOT NULL,
    "name_ciphertext" TEXT NOT NULL,
    "name_iv" VARCHAR(24) NOT NULL,
    "name_tag" VARCHAR(32) NOT NULL,
    "phone_ciphertext" TEXT,
    "phone_iv" VARCHAR(24),
    "phone_tag" VARCHAR(32),
    "key_version" INTEGER NOT NULL DEFAULT 1,
    "verified_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verified_identities_pkey" PRIMARY KEY ("verified_identity_id"),
    CONSTRAINT "verified_identities_phone_encryption_consistent" CHECK (
      ("phone_ciphertext" IS NULL AND "phone_iv" IS NULL AND "phone_tag" IS NULL)
      OR
      ("phone_ciphertext" IS NOT NULL AND "phone_iv" IS NOT NULL AND "phone_tag" IS NOT NULL)
    )
);

-- CreateIndex
CREATE UNIQUE INDEX "identity_verification_attempts_provider_verification_id_key" ON "identity_verification_attempts"("provider_verification_id");
CREATE UNIQUE INDEX "identity_verification_attempts_state_hash_key" ON "identity_verification_attempts"("state_hash");
CREATE INDEX "identity_verification_attempts_auth_id_purpose_status_idx" ON "identity_verification_attempts"("auth_id", "purpose", "status");
CREATE INDEX "identity_verification_attempts_expires_at_status_idx" ON "identity_verification_attempts"("expires_at", "status");

CREATE UNIQUE INDEX "verified_identities_auth_id_key" ON "verified_identities"("auth_id");
CREATE UNIQUE INDEX "verified_identities_provider_verification_id_key" ON "verified_identities"("provider_verification_id");
CREATE UNIQUE INDEX "verified_identities_ci_lookup_hash_key" ON "verified_identities"("ci_lookup_hash");
CREATE UNIQUE INDEX "verified_identities_di_lookup_hash_key" ON "verified_identities"("di_lookup_hash");
CREATE INDEX "verified_identities_provider_verified_at_idx" ON "verified_identities"("provider", "verified_at");

-- AddForeignKey
ALTER TABLE "identity_verification_attempts" ADD CONSTRAINT "identity_verification_attempts_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "users_auth"("auth_id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "verified_identities" ADD CONSTRAINT "verified_identities_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "users_auth"("auth_id") ON DELETE CASCADE ON UPDATE CASCADE;
