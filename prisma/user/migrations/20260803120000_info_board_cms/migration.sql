DO $$
BEGIN
    CREATE TYPE "InfoCategory" AS ENUM (
        'VISA_INFO',
        'EDUCATION',
        'LIVING_TIPS',
        'POLICY_LAW',
        'ANNOUNCEMENTS'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    CREATE TYPE "InfoBoardStatus" AS ENUM (
        'DRAFT',
        'SCHEDULED',
        'PUBLISHED',
        'ARCHIVED'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    CREATE TYPE "InfoBoardAudience" AS ENUM ('ALL', 'WORKER', 'COMPANY');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "info_board" (
    "post_id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "InfoCategory" NOT NULL,
    "thumbnail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "info_board_pkey" PRIMARY KEY ("post_id")
);

ALTER TABLE "info_board"
    ADD COLUMN IF NOT EXISTS "status" "InfoBoardStatus" NOT NULL DEFAULT 'PUBLISHED',
    ADD COLUMN IF NOT EXISTS "audience" "InfoBoardAudience" NOT NULL DEFAULT 'ALL',
    ADD COLUMN IF NOT EXISTS "is_pinned" BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS "scheduled_at" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "published_at" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "created_by" TEXT,
    ADD COLUMN IF NOT EXISTS "updated_by" TEXT,
    ADD COLUMN IF NOT EXISTS "deleted_at" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "deleted_by" TEXT,
    ADD COLUMN IF NOT EXISTS "view_count" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1;

UPDATE "info_board"
SET
    "status" = 'PUBLISHED',
    "audience" = 'ALL',
    "published_at" = COALESCE("published_at", "created_at")
WHERE "deleted_at" IS NULL;

CREATE TABLE IF NOT EXISTS "info_board_translations" (
    "translation_id" BIGSERIAL NOT NULL,
    "post_id" BIGINT NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "summary" VARCHAR(500),
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "info_board_translations_pkey" PRIMARY KEY ("translation_id"),
    CONSTRAINT "info_board_translations_post_id_fkey"
        FOREIGN KEY ("post_id") REFERENCES "info_board"("post_id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

DO $$
BEGIN
    ALTER TABLE "info_board_translations"
        ADD CONSTRAINT "info_board_translations_locale_check"
        CHECK ("locale" IN ('ko', 'en', 'vi', 'th', 'fil'));
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "info_board_assets" (
    "asset_id" BIGSERIAL NOT NULL,
    "post_id" BIGINT,
    "storage_key" TEXT NOT NULL,
    "original_name" VARCHAR(255) NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "size_bytes" INTEGER NOT NULL,
    "uploaded_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "info_board_assets_pkey" PRIMARY KEY ("asset_id"),
    CONSTRAINT "info_board_assets_post_id_fkey"
        FOREIGN KEY ("post_id") REFERENCES "info_board"("post_id")
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "info_board_translations_post_id_locale_key"
    ON "info_board_translations"("post_id", "locale");

INSERT INTO "info_board_translations" (
    "post_id", "locale", "title", "content", "created_at", "updated_at"
)
SELECT
    "post_id", 'ko', "title", "content", "created_at", "updated_at"
FROM "info_board"
ON CONFLICT ("post_id", "locale") DO NOTHING;

CREATE INDEX IF NOT EXISTS "info_board_translations_locale_idx"
    ON "info_board_translations"("locale");
CREATE UNIQUE INDEX IF NOT EXISTS "info_board_assets_storage_key_key"
    ON "info_board_assets"("storage_key");
CREATE INDEX IF NOT EXISTS "info_board_assets_post_id_idx"
    ON "info_board_assets"("post_id");
CREATE INDEX IF NOT EXISTS "info_board_assets_uploaded_by_created_at_idx"
    ON "info_board_assets"("uploaded_by", "created_at");
CREATE INDEX IF NOT EXISTS "info_board_category_idx"
    ON "info_board"("category");
CREATE INDEX IF NOT EXISTS "info_board_created_at_idx"
    ON "info_board"("created_at");
CREATE INDEX IF NOT EXISTS "info_board_status_deleted_at_audience_idx"
    ON "info_board"("status", "deleted_at", "audience");
CREATE INDEX IF NOT EXISTS "info_board_is_pinned_published_at_idx"
    ON "info_board"("is_pinned", "published_at");
