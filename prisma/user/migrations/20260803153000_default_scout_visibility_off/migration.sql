-- Keep only users with an active, explicit talent-pool disclosure consent open.
UPDATE "profiles_individual" AS profile
SET "is_open_to_scout" = FALSE
WHERE profile."is_open_to_scout" = TRUE
  AND NOT EXISTS (
    SELECT 1
    FROM "user_consent_records" AS consent
    WHERE consent."auth_id" = profile."auth_id"
      AND consent."consent_type" = 'TALENT_POOL_DISCLOSURE'
      AND consent."granted" = TRUE
      AND consent."withdrawn_at" IS NULL
  );

ALTER TABLE "profiles_individual"
ALTER COLUMN "is_open_to_scout" SET DEFAULT FALSE;
