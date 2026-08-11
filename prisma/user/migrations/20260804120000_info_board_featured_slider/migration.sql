DO $$
BEGIN
    CREATE TYPE "InfoBoardBannerTheme" AS ENUM ('BRAND', 'CHARCOAL', 'GREEN', 'AMBER', 'RED');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "info_board"
    ADD COLUMN IF NOT EXISTS "is_featured" BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN IF NOT EXISTS "featured_order" INTEGER,
    ADD COLUMN IF NOT EXISTS "banner_theme" "InfoBoardBannerTheme" NOT NULL DEFAULT 'BRAND',
    ADD COLUMN IF NOT EXISTS "featured_start_at" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "featured_end_at" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "banner_asset_id" BIGINT;

DO $$
BEGIN
    ALTER TABLE "info_board"
        ADD CONSTRAINT "info_board_banner_asset_id_fkey"
        FOREIGN KEY ("banner_asset_id") REFERENCES "info_board_assets"("asset_id")
        ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TABLE "info_board"
        ADD CONSTRAINT "info_board_featured_order_check"
        CHECK ("featured_order" IS NULL OR "featured_order" BETWEEN 1 AND 8);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS "info_board_is_featured_featured_order_status_deleted_at_idx"
    ON "info_board"("is_featured", "featured_order", "status", "deleted_at");

CREATE TABLE IF NOT EXISTS "info_board_featured_audits" (
    "audit_id" BIGSERIAL NOT NULL,
    "post_id" BIGINT,
    "action" VARCHAR(20) NOT NULL,
    "previous_state" JSONB,
    "next_state" JSONB,
    "actor_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "info_board_featured_audits_pkey" PRIMARY KEY ("audit_id"),
    CONSTRAINT "info_board_featured_audits_post_id_fkey"
      FOREIGN KEY ("post_id") REFERENCES "info_board"("post_id")
      ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "info_board_featured_audits_post_id_created_at_idx"
    ON "info_board_featured_audits"("post_id", "created_at");
CREATE INDEX IF NOT EXISTS "info_board_featured_audits_created_at_idx"
    ON "info_board_featured_audits"("created_at");
