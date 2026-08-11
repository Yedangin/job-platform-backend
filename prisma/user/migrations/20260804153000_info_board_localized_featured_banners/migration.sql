CREATE TABLE IF NOT EXISTS "info_board_featured_banners" (
    "banner_id" BIGSERIAL NOT NULL,
    "post_id" BIGINT NOT NULL,
    "locale" VARCHAR(5) NOT NULL,
    "asset_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "info_board_featured_banners_pkey" PRIMARY KEY ("banner_id"),
    CONSTRAINT "info_board_featured_banners_locale_check"
      CHECK ("locale" IN ('ko', 'en', 'vi', 'th', 'fil')),
    CONSTRAINT "info_board_featured_banners_post_id_fkey"
      FOREIGN KEY ("post_id") REFERENCES "info_board"("post_id")
      ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "info_board_featured_banners_asset_id_fkey"
      FOREIGN KEY ("asset_id") REFERENCES "info_board_assets"("asset_id")
      ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "info_board_featured_banners_post_id_locale_key"
    ON "info_board_featured_banners"("post_id", "locale");
CREATE UNIQUE INDEX IF NOT EXISTS "info_board_featured_banners_post_id_asset_id_key"
    ON "info_board_featured_banners"("post_id", "asset_id");
CREATE INDEX IF NOT EXISTS "info_board_featured_banners_asset_id_idx"
    ON "info_board_featured_banners"("asset_id");

INSERT INTO "info_board_featured_banners" ("post_id", "locale", "asset_id")
SELECT "post_id", 'ko', "banner_asset_id"
FROM "info_board"
WHERE "banner_asset_id" IS NOT NULL
ON CONFLICT ("post_id", "locale") DO NOTHING;
