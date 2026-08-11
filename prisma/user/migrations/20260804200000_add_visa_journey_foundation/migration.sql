-- 비자 여정·정책 감사 기반을 추가하는 비파괴 마이그레이션
-- Additive migration for visa journeys and policy auditability

CREATE TYPE "VisaPolicyReleaseStatus" AS ENUM (
  'DRAFT', 'UNDER_REVIEW', 'APPROVED', 'SCHEDULED',
  'ACTIVE', 'SUPERSEDED', 'WITHDRAWN'
);
CREATE TYPE "VisaPathwayStatus" AS ENUM (
  'DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ACTIVE', 'ARCHIVED'
);
CREATE TYPE "VisaJourneyStage" AS ENUM (
  'ASSESSMENT', 'CONDITION_ROADMAP', 'EVIDENCE_PREPARATION',
  'SELF_PROCEDURE', 'EXPERT_SUPPORT', 'COMPLETED'
);
CREATE TYPE "VisaPolicyFreshness" AS ENUM (
  'CURRENT', 'UPCOMING_CHANGE', 'UNDER_REVIEW',
  'STALE', 'MISSING', 'CONFLICT'
);
CREATE TYPE "VisaAssessmentOutcome" AS ENUM (
  'ELIGIBLE', 'CONDITIONAL', 'INELIGIBLE',
  'INSUFFICIENT_DATA', 'REVIEW_REQUIRED'
);
CREATE TYPE "VisaJourneyItemKind" AS ENUM ('GAP_ACTION', 'EVIDENCE', 'PROCEDURE');
CREATE TYPE "VisaJourneyItemStatus" AS ENUM (
  'TODO', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED', 'NOT_APPLICABLE'
);
CREATE TYPE "VisaExpertServiceType" AS ENUM (
  'CONSULTATION', 'DOCUMENT_REVIEW', 'APPLICATION_AGENCY'
);
CREATE TYPE "VisaExpertCaseStatus" AS ENUM (
  'REQUESTED', 'ASSIGNED', 'IN_PROGRESS',
  'WAITING_FOR_USER', 'COMPLETED', 'CANCELLED'
);
CREATE TYPE "VisaExpertCredentialStatus" AS ENUM (
  'PENDING', 'VERIFIED', 'SUSPENDED', 'EXPIRED'
);
CREATE TYPE "VisaPolicyAuditAction" AS ENUM (
  'CREATED', 'UPDATED', 'SUBMITTED_FOR_REVIEW', 'APPROVED',
  'REJECTED', 'ACTIVATED', 'SUPERSEDED', 'WITHDRAWN'
);

CREATE TABLE "visa_policy_releases" (
  "policy_release_id" TEXT NOT NULL,
  "domain" VARCHAR(50) NOT NULL DEFAULT 'VISA_JOURNEY',
  "name" VARCHAR(160) NOT NULL,
  "version" VARCHAR(50) NOT NULL,
  "content_hash" VARCHAR(128) NOT NULL,
  "status" "VisaPolicyReleaseStatus" NOT NULL DEFAULT 'DRAFT',
  "published_at" TIMESTAMP(3),
  "effective_from" TIMESTAMP(3) NOT NULL,
  "effective_to" TIMESTAMP(3),
  "reviewed_at" TIMESTAMP(3),
  "reviewed_by" TEXT,
  "approved_at" TIMESTAMP(3),
  "approved_by" TEXT,
  "activated_at" TIMESTAMP(3),
  "created_by" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "visa_policy_releases_pkey" PRIMARY KEY ("policy_release_id")
);
CREATE UNIQUE INDEX "visa_policy_releases_domain_version_key"
  ON "visa_policy_releases"("domain", "version");
CREATE INDEX "visa_policy_releases_status_effective_idx"
  ON "visa_policy_releases"("status", "effective_from", "effective_to");
CREATE UNIQUE INDEX "visa_policy_releases_one_active_domain_idx"
  ON "visa_policy_releases"("domain") WHERE "status" = 'ACTIVE';

ALTER TABLE "visa_rules" ADD COLUMN "policy_release_id" TEXT;
ALTER TABLE "visa_rules" ADD CONSTRAINT "visa_rules_policy_release_id_fkey"
  FOREIGN KEY ("policy_release_id") REFERENCES "visa_policy_releases"("policy_release_id")
  ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "visa_rules_policy_release_id_idx" ON "visa_rules"("policy_release_id");

-- 기존 채용공고 비자 판정에도 동일한 정책 시점·버전 감사 필드를 추가한다.
-- Add policy/version audit fields to the existing job-posting evaluation log.
ALTER TABLE "visa_evaluation_logs"
  ADD COLUMN "outcome" VARCHAR(40),
  ADD COLUMN "engine_version" VARCHAR(50),
  ADD COLUMN "policy_release_id" TEXT,
  ADD COLUMN "policy_version" VARCHAR(50),
  ADD COLUMN "policy_hash" VARCHAR(128),
  ADD COLUMN "policy_as_of" TIMESTAMP(3),
  ADD COLUMN "policy_effective_from" TIMESTAMP(3),
  ADD COLUMN "policy_reviewed_at" TIMESTAMP(3);
CREATE INDEX "visa_evaluation_logs_policy_release_evaluated_idx"
  ON "visa_evaluation_logs"("policy_release_id", "evaluated_at");

CREATE TABLE "visa_pathway_definitions" (
  "pathway_id" TEXT NOT NULL,
  "policy_release_id" TEXT NOT NULL,
  "current_visa_code" VARCHAR(30),
  "target_visa_code" VARCHAR(30) NOT NULL,
  "name" VARCHAR(160) NOT NULL,
  "locale" VARCHAR(10) NOT NULL DEFAULT 'ko',
  "version" INTEGER NOT NULL DEFAULT 1,
  "status" "VisaPathwayStatus" NOT NULL DEFAULT 'DRAFT',
  "definition" JSONB NOT NULL,
  "created_by" TEXT NOT NULL,
  "updated_by" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "visa_pathway_definitions_pkey" PRIMARY KEY ("pathway_id"),
  CONSTRAINT "visa_pathway_definitions_policy_release_id_fkey"
    FOREIGN KEY ("policy_release_id") REFERENCES "visa_policy_releases"("policy_release_id")
    ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "visa_pathway_definitions_release_route_locale_version_key"
  ON "visa_pathway_definitions"(
    "policy_release_id", "current_visa_code", "target_visa_code", "locale", "version"
  );
CREATE INDEX "visa_pathway_definitions_target_status_idx"
  ON "visa_pathway_definitions"("target_visa_code", "status");

CREATE TABLE "visa_journeys" (
  "journey_id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "current_visa_code" VARCHAR(30),
  "target_visa_code" VARCHAR(30) NOT NULL,
  "target_pathway_name" VARCHAR(160),
  "locale" VARCHAR(10) NOT NULL DEFAULT 'ko',
  "current_stage" "VisaJourneyStage" NOT NULL DEFAULT 'ASSESSMENT',
  "target_application_date" DATE,
  "policy_release_id" TEXT,
  "policy_freshness" "VisaPolicyFreshness" NOT NULL DEFAULT 'MISSING',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "visa_journeys_pkey" PRIMARY KEY ("journey_id"),
  CONSTRAINT "visa_journeys_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users_auth"("auth_id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "visa_journeys_policy_release_id_fkey"
    FOREIGN KEY ("policy_release_id") REFERENCES "visa_policy_releases"("policy_release_id")
    ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX "visa_journeys_user_updated_idx" ON "visa_journeys"("user_id", "updated_at");
CREATE INDEX "visa_journeys_target_stage_idx" ON "visa_journeys"("target_visa_code", "current_stage");
CREATE INDEX "visa_journeys_release_freshness_idx"
  ON "visa_journeys"("policy_release_id", "policy_freshness");

CREATE TABLE "visa_journey_assessments" (
  "assessment_id" BIGSERIAL NOT NULL,
  "journey_id" TEXT NOT NULL,
  "outcome" "VisaAssessmentOutcome" NOT NULL,
  "input_snapshot" JSONB NOT NULL,
  "output_snapshot" JSONB NOT NULL,
  "requirements" JSONB NOT NULL,
  "missing_inputs" JSONB NOT NULL,
  "applied_rule_ids" JSONB NOT NULL,
  "applied_rule_versions" JSONB NOT NULL,
  "engine_version" VARCHAR(50) NOT NULL,
  "policy_release_id" TEXT,
  "policy_version" VARCHAR(50),
  "policy_hash" VARCHAR(128),
  "policy_as_of" TIMESTAMP(3) NOT NULL,
  "policy_effective_from" TIMESTAMP(3),
  "policy_reviewed_at" TIMESTAMP(3),
  "created_by" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "visa_journey_assessments_pkey" PRIMARY KEY ("assessment_id"),
  CONSTRAINT "visa_journey_assessments_journey_id_fkey"
    FOREIGN KEY ("journey_id") REFERENCES "visa_journeys"("journey_id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "visa_journey_assessments_policy_release_id_fkey"
    FOREIGN KEY ("policy_release_id") REFERENCES "visa_policy_releases"("policy_release_id")
    ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX "visa_journey_assessments_journey_created_idx"
  ON "visa_journey_assessments"("journey_id", "created_at");
CREATE INDEX "visa_journey_assessments_outcome_created_idx"
  ON "visa_journey_assessments"("outcome", "created_at");
CREATE INDEX "visa_journey_assessments_release_created_idx"
  ON "visa_journey_assessments"("policy_release_id", "created_at");

CREATE TABLE "visa_journey_items" (
  "item_id" TEXT NOT NULL,
  "journey_id" TEXT NOT NULL,
  "kind" "VisaJourneyItemKind" NOT NULL,
  "source_key" VARCHAR(160),
  "title" VARCHAR(240) NOT NULL,
  "description" TEXT,
  "status" "VisaJourneyItemStatus" NOT NULL DEFAULT 'TODO',
  "assignee" VARCHAR(80),
  "due_at" TIMESTAMP(3),
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "metadata" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "visa_journey_items_pkey" PRIMARY KEY ("item_id"),
  CONSTRAINT "visa_journey_items_journey_id_fkey"
    FOREIGN KEY ("journey_id") REFERENCES "visa_journeys"("journey_id")
    ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "visa_journey_items_journey_kind_sort_idx"
  ON "visa_journey_items"("journey_id", "kind", "sort_order");
CREATE INDEX "visa_journey_items_journey_status_idx"
  ON "visa_journey_items"("journey_id", "status");
CREATE UNIQUE INDEX "visa_journey_items_journey_kind_source_key_key"
  ON "visa_journey_items"("journey_id", "kind", "source_key");

CREATE TABLE "visa_expert_credentials" (
  "expert_credential_id" TEXT NOT NULL,
  "expert_id" TEXT NOT NULL,
  "qualification_type" VARCHAR(80) NOT NULL,
  "qualification_number_masked" VARCHAR(80) NOT NULL,
  "business_filing_verified_at" TIMESTAMP(3),
  "immigration_agency_registration_verified_at" TIMESTAMP(3),
  "valid_until" DATE,
  "status" "VisaExpertCredentialStatus" NOT NULL DEFAULT 'PENDING',
  "verified_by" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "visa_expert_credentials_pkey" PRIMARY KEY ("expert_credential_id")
);
CREATE UNIQUE INDEX "visa_expert_credentials_expert_id_key"
  ON "visa_expert_credentials"("expert_id");
CREATE INDEX "visa_expert_credentials_status_valid_until_idx"
  ON "visa_expert_credentials"("status", "valid_until");

CREATE TABLE "visa_expert_cases" (
  "expert_case_id" TEXT NOT NULL,
  "journey_id" TEXT NOT NULL,
  "service_type" "VisaExpertServiceType" NOT NULL,
  "status" "VisaExpertCaseStatus" NOT NULL DEFAULT 'REQUESTED',
  "question" TEXT,
  "consent_to_share" BOOLEAN NOT NULL,
  "consented_at" TIMESTAMP(3),
  "assigned_expert_id" TEXT,
  "created_by" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "visa_expert_cases_pkey" PRIMARY KEY ("expert_case_id"),
  CONSTRAINT "visa_expert_cases_consent_check"
    CHECK ("consent_to_share" = true AND "consented_at" IS NOT NULL),
  CONSTRAINT "visa_expert_cases_journey_id_fkey"
    FOREIGN KEY ("journey_id") REFERENCES "visa_journeys"("journey_id")
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "visa_expert_cases_assigned_expert_id_fkey"
    FOREIGN KEY ("assigned_expert_id") REFERENCES "visa_expert_credentials"("expert_id")
    ON DELETE SET NULL ON UPDATE CASCADE
);
CREATE INDEX "visa_expert_cases_journey_created_idx"
  ON "visa_expert_cases"("journey_id", "created_at");
CREATE INDEX "visa_expert_cases_status_created_idx"
  ON "visa_expert_cases"("status", "created_at");
CREATE INDEX "visa_expert_cases_expert_status_idx"
  ON "visa_expert_cases"("assigned_expert_id", "status");

-- 신청 대행은 유효한 출입국민원 대행 등록을 확인한 행정사에게만 배정한다.
-- Agency cases may only be assigned to a currently verified immigration agent.
CREATE FUNCTION enforce_visa_agency_credential() RETURNS trigger AS $$
BEGIN
  IF NEW."service_type" = 'APPLICATION_AGENCY' AND NEW."assigned_expert_id" IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM "visa_expert_credentials" c
       WHERE c."expert_id" = NEW."assigned_expert_id"
         AND c."status" = 'VERIFIED'
         AND c."business_filing_verified_at" IS NOT NULL
         AND c."immigration_agency_registration_verified_at" IS NOT NULL
         AND (c."valid_until" IS NULL OR c."valid_until" >= CURRENT_DATE)
     ) THEN
    RAISE EXCEPTION 'application agency assignment requires a valid verified credential';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER visa_expert_cases_agency_credential_gate
  BEFORE INSERT OR UPDATE OF "assigned_expert_id", "service_type"
  ON "visa_expert_cases"
  FOR EACH ROW EXECUTE FUNCTION enforce_visa_agency_credential();

CREATE TABLE "visa_journey_audit_events" (
  "audit_event_id" BIGSERIAL NOT NULL,
  "journey_id" TEXT NOT NULL,
  "event_type" VARCHAR(80) NOT NULL,
  "entity_type" VARCHAR(80) NOT NULL,
  "entity_id" TEXT,
  "before_snapshot" JSONB,
  "after_snapshot" JSONB,
  "actor_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "visa_journey_audit_events_pkey" PRIMARY KEY ("audit_event_id"),
  CONSTRAINT "visa_journey_audit_events_journey_id_fkey"
    FOREIGN KEY ("journey_id") REFERENCES "visa_journeys"("journey_id")
    ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "visa_journey_audit_events_journey_created_idx"
  ON "visa_journey_audit_events"("journey_id", "created_at");
CREATE INDEX "visa_journey_audit_events_type_created_idx"
  ON "visa_journey_audit_events"("event_type", "created_at");

CREATE TABLE "visa_policy_change_audits" (
  "change_audit_id" BIGSERIAL NOT NULL,
  "entity_type" VARCHAR(80) NOT NULL,
  "entity_id" TEXT NOT NULL,
  "rule_id" BIGINT,
  "policy_release_id" TEXT,
  "action" "VisaPolicyAuditAction" NOT NULL,
  "before_snapshot" JSONB,
  "after_snapshot" JSONB,
  "change_reason" TEXT NOT NULL,
  "actor_id" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "visa_policy_change_audits_pkey" PRIMARY KEY ("change_audit_id")
);
CREATE INDEX "visa_policy_change_audits_entity_created_idx"
  ON "visa_policy_change_audits"("entity_type", "entity_id", "created_at");
CREATE INDEX "visa_policy_change_audits_rule_created_idx"
  ON "visa_policy_change_audits"("rule_id", "created_at");
CREATE INDEX "visa_policy_change_audits_release_created_idx"
  ON "visa_policy_change_audits"("policy_release_id", "created_at");

-- 판정·정책 감사 기록은 수정하지 않고 새 기록을 추가한다.
-- Decision and policy audit rows are append-only; corrections create new rows.
CREATE FUNCTION prevent_visa_audit_update() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'visa assessment and policy audit rows are immutable';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER visa_journey_assessments_immutable
  BEFORE UPDATE ON "visa_journey_assessments"
  FOR EACH ROW EXECUTE FUNCTION prevent_visa_audit_update();
CREATE TRIGGER visa_policy_change_audits_immutable
  BEFORE UPDATE ON "visa_policy_change_audits"
  FOR EACH ROW EXECUTE FUNCTION prevent_visa_audit_update();
