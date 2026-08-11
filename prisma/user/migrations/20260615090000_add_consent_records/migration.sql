CREATE TABLE "user_consent_records" (
    "consent_id" BIGSERIAL NOT NULL,
    "auth_id" TEXT NOT NULL,
    "consent_type" VARCHAR(50) NOT NULL,
    "policy_version" VARCHAR(30) NOT NULL,
    "granted" BOOLEAN NOT NULL,
    "channel" VARCHAR(30) NOT NULL DEFAULT 'WEB',
    "ip_address" VARCHAR(64),
    "user_agent" TEXT,
    "consented_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "withdrawn_at" TIMESTAMP(3),
    CONSTRAINT "user_consent_records_pkey" PRIMARY KEY ("consent_id")
);

CREATE INDEX "user_consent_records_auth_id_consent_type_consented_at_idx"
ON "user_consent_records"("auth_id", "consent_type", "consented_at");

ALTER TABLE "user_consent_records"
ADD CONSTRAINT "user_consent_records_auth_id_fkey"
FOREIGN KEY ("auth_id") REFERENCES "users_auth"("auth_id")
ON DELETE CASCADE ON UPDATE CASCADE;
