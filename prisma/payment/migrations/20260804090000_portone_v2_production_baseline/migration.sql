-- Support both known deployment states:
-- 1. the abandoned Toss prototype created by the 2025 migration; and
-- 2. the pre-hardening PortOne tables previously deployed with db push.
-- Existing data is retained in an archive schema before the hardened ledger is
-- created. Valid PortOne rows are copied back near the end of this migration.
CREATE SCHEMA IF NOT EXISTS "payment_legacy";
CREATE SCHEMA IF NOT EXISTS "payment_pre_portone";

DO $$
DECLARE
    has_current_portone BOOLEAN := to_regclass('public.products') IS NOT NULL;
BEGIN
    IF has_current_portone THEN
        -- Move children first; PostgreSQL keeps foreign-key references valid.
        IF to_regclass('public.viewing_logs') IS NOT NULL THEN
            ALTER TABLE "viewing_logs" SET SCHEMA "payment_pre_portone";
        END IF;
        IF to_regclass('public.viewing_credits') IS NOT NULL THEN
            ALTER TABLE "viewing_credits" SET SCHEMA "payment_pre_portone";
        END IF;
        IF to_regclass('public.coupon_usages') IS NOT NULL THEN
            ALTER TABLE "coupon_usages" SET SCHEMA "payment_pre_portone";
        END IF;
        IF to_regclass('public.payments') IS NOT NULL THEN
            ALTER TABLE "payments" SET SCHEMA "payment_pre_portone";
        END IF;
        IF to_regclass('public.orders') IS NOT NULL THEN
            ALTER TABLE "orders" SET SCHEMA "payment_pre_portone";
        END IF;
        IF to_regclass('public.coupons') IS NOT NULL THEN
            ALTER TABLE "coupons" SET SCHEMA "payment_pre_portone";
        END IF;
        ALTER TABLE "products" SET SCHEMA "payment_pre_portone";

        ALTER TYPE "ProductCategory" SET SCHEMA "payment_pre_portone";
        ALTER TYPE "OrderStatus" SET SCHEMA "payment_pre_portone";
        ALTER TYPE "PaymentMethod" SET SCHEMA "payment_pre_portone";
        ALTER TYPE "PaymentStatus" SET SCHEMA "payment_pre_portone";
        ALTER TYPE "CouponType" SET SCHEMA "payment_pre_portone";
    ELSE
        IF to_regclass('public.transaction_logs') IS NOT NULL THEN
            ALTER TABLE "transaction_logs" SET SCHEMA "payment_legacy";
        END IF;
        IF to_regclass('public.transactions') IS NOT NULL THEN
            ALTER TABLE "transactions" SET SCHEMA "payment_legacy";
        END IF;
        IF to_regclass('public.deposits') IS NOT NULL THEN
            ALTER TABLE "deposits" SET SCHEMA "payment_legacy";
        END IF;
        IF to_regclass('public.wallets') IS NOT NULL THEN
            ALTER TABLE "wallets" SET SCHEMA "payment_legacy";
        END IF;

        IF EXISTS (
            SELECT 1 FROM pg_type t
            JOIN pg_namespace n ON n.oid = t.typnamespace
            WHERE n.nspname = 'public' AND t.typname = 'PaymentMethod'
        ) THEN
            ALTER TYPE "PaymentMethod" RENAME TO "LegacyPaymentMethod";
            ALTER TYPE "LegacyPaymentMethod" SET SCHEMA "payment_legacy";
        END IF;
        IF EXISTS (
            SELECT 1 FROM pg_type t
            JOIN pg_namespace n ON n.oid = t.typnamespace
            WHERE n.nspname = 'public' AND t.typname = 'TransactionStatus'
        ) THEN
            ALTER TYPE "TransactionStatus" SET SCHEMA "payment_legacy";
        END IF;
        IF EXISTS (
            SELECT 1 FROM pg_type t
            JOIN pg_namespace n ON n.oid = t.typnamespace
            WHERE n.nspname = 'public' AND t.typname = 'DepositStatus'
        ) THEN
            ALTER TYPE "DepositStatus" SET SCHEMA "payment_legacy";
        END IF;
    END IF;
END $$;

-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('JOB_POSTING', 'TALENT_VIEW', 'ADDON');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'REFUNDED', 'FAILED');

-- CreateEnum
CREATE TYPE "FulfillmentStatus" AS ENUM ('PENDING', 'PROCESSING', 'FULFILLED', 'FAILED', 'ROLLBACK_PROCESSING', 'ROLLED_BACK');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'VIRTUAL_ACCOUNT', 'EASY_PAY', 'TRANSFER', 'MOBILE', 'GIFT_CERTIFICATE', 'CONVENIENCE_STORE', 'PAYPAL', 'ALIPAY', 'CRYPTO', 'FREE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLATION_PENDING', 'CANCELLED', 'PARTIAL_CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentCancellationStatus" AS ENUM ('PROCESSING', 'REQUESTED', 'SUCCEEDED', 'FAILED');

-- CreateEnum
CREATE TYPE "WebhookProcessingStatus" AS ENUM ('PROCESSING', 'PROCESSED', 'FAILED');

-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('FIXED_DISCOUNT', 'PERCENT_DISCOUNT', 'FREE_ITEM');

-- CreateTable
CREATE TABLE "products" (
    "product_id" SERIAL NOT NULL,
    "product_code" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_name_en" TEXT NOT NULL,
    "product_category" "ProductCategory" NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "metadata" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "order_no" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "target_job_id" BIGINT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "total_amount" INTEGER NOT NULL,
    "original_amount" INTEGER NOT NULL,
    "coupon_id" INTEGER,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "currency" TEXT NOT NULL DEFAULT 'KRW',
    "fulfillment_status" "FulfillmentStatus" NOT NULL DEFAULT 'PENDING',
    "fulfillment_attempts" INTEGER NOT NULL DEFAULT 0,
    "fulfillment_started_at" TIMESTAMP(3),
    "fulfilled_at" TIMESTAMP(3),
    "fulfillment_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "payments" (
    "payment_id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "portone_payment_id" TEXT NOT NULL,
    "method" "PaymentMethod" NOT NULL DEFAULT 'UNKNOWN',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "store_id" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'KRW',
    "transaction_id" TEXT,
    "paid_amount" INTEGER,
    "paid_at" TIMESTAMP(3),
    "receipt_url" TEXT,
    "card_info" TEXT,
    "cancelled_amount" INTEGER,
    "cancelled_at" TIMESTAMP(3),
    "cancel_reason" TEXT,
    "webhook_data" TEXT,
    "fail_reason" TEXT,
    "last_synced_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "payment_cancellations" (
    "cancellation_id" TEXT NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "idempotency_key" TEXT NOT NULL,
    "portone_cancellation_id" TEXT,
    "amount" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "PaymentCancellationStatus" NOT NULL DEFAULT 'PROCESSING',
    "previous_payment_status" "PaymentStatus" NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_cancellations_pkey" PRIMARY KEY ("cancellation_id")
);

-- CreateTable
CREATE TABLE "payment_webhook_events" (
    "webhook_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "portone_payment_id" TEXT,
    "payload_hash" TEXT NOT NULL,
    "status" "WebhookProcessingStatus" NOT NULL DEFAULT 'PROCESSING',
    "attempt_count" INTEGER NOT NULL DEFAULT 1,
    "locked_until" TIMESTAMP(3) NOT NULL,
    "received_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3),
    "last_error" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_webhook_events_pkey" PRIMARY KEY ("webhook_id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "coupon_id" SERIAL NOT NULL,
    "coupon_code" TEXT NOT NULL,
    "coupon_name" TEXT NOT NULL,
    "coupon_type" "CouponType" NOT NULL,
    "coupon_value" INTEGER NOT NULL,
    "target_product" "ProductCategory",
    "min_order_amount" INTEGER,
    "max_uses" INTEGER,
    "used_count" INTEGER NOT NULL DEFAULT 0,
    "max_uses_per_user" INTEGER NOT NULL DEFAULT 1,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("coupon_id")
);

-- CreateTable
CREATE TABLE "coupon_usages" (
    "usage_id" SERIAL NOT NULL,
    "coupon_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" INTEGER,
    "used_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coupon_usages_pkey" PRIMARY KEY ("usage_id")
);

-- CreateTable
CREATE TABLE "viewing_credits" (
    "credit_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_credits" INTEGER NOT NULL,
    "used_credits" INTEGER NOT NULL DEFAULT 0,
    "source" TEXT NOT NULL,
    "order_id" INTEGER,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "viewing_credits_pkey" PRIMARY KEY ("credit_id")
);

-- CreateTable
CREATE TABLE "viewing_logs" (
    "log_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "resume_id" BIGINT NOT NULL,
    "credit_id" INTEGER,
    "viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "viewing_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_product_code_key" ON "products"("product_code");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_no_key" ON "orders"("order_no");

-- CreateIndex
CREATE INDEX "orders_user_id_idx" ON "orders"("user_id");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_created_at_idx" ON "orders"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_portone_payment_id_key" ON "payments"("portone_payment_id");

-- CreateIndex
CREATE INDEX "payments_portone_payment_id_idx" ON "payments"("portone_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_cancellations_idempotency_key_key" ON "payment_cancellations"("idempotency_key");

-- CreateIndex
CREATE UNIQUE INDEX "payment_cancellations_portone_cancellation_id_key" ON "payment_cancellations"("portone_cancellation_id");

-- CreateIndex
CREATE INDEX "payment_cancellations_payment_id_status_idx" ON "payment_cancellations"("payment_id", "status");

-- CreateIndex
CREATE INDEX "payment_webhook_events_status_locked_until_idx" ON "payment_webhook_events"("status", "locked_until");

-- CreateIndex
CREATE INDEX "payment_webhook_events_portone_payment_id_idx" ON "payment_webhook_events"("portone_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_coupon_code_key" ON "coupons"("coupon_code");

-- CreateIndex
CREATE UNIQUE INDEX "coupon_usages_order_id_key" ON "coupon_usages"("order_id");

-- CreateIndex
CREATE INDEX "coupon_usages_coupon_id_idx" ON "coupon_usages"("coupon_id");

-- CreateIndex
CREATE INDEX "coupon_usages_user_id_idx" ON "coupon_usages"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "viewing_credits_order_id_key" ON "viewing_credits"("order_id");

-- CreateIndex
CREATE INDEX "viewing_credits_user_id_expires_at_idx" ON "viewing_credits"("user_id", "expires_at");

-- CreateIndex
CREATE INDEX "viewing_logs_user_id_idx" ON "viewing_logs"("user_id");

-- CreateIndex
CREATE INDEX "viewing_logs_resume_id_idx" ON "viewing_logs"("resume_id");

-- CreateIndex
CREATE UNIQUE INDEX "viewing_logs_user_id_resume_id_key" ON "viewing_logs"("user_id", "resume_id");

-- AddCheckConstraint
ALTER TABLE "products"
ADD CONSTRAINT "products_price_positive_check" CHECK ("price" > 0);

-- AddCheckConstraint
ALTER TABLE "orders"
ADD CONSTRAINT "orders_amount_integrity_check" CHECK (
    "quantity" > 0
    AND "total_amount" > 0
    AND "original_amount" > 0
    AND "total_amount" <= "original_amount"
);

-- AddCheckConstraint
ALTER TABLE "payments"
ADD CONSTRAINT "payments_amount_integrity_check" CHECK (
    ("paid_amount" IS NULL OR "paid_amount" > 0)
    AND ("cancelled_amount" IS NULL OR "cancelled_amount" > 0)
    AND (
        "paid_amount" IS NULL
        OR "cancelled_amount" IS NULL
        OR "cancelled_amount" <= "paid_amount"
    )
);

-- AddCheckConstraint
ALTER TABLE "payment_cancellations"
ADD CONSTRAINT "payment_cancellations_amount_positive_check" CHECK ("amount" > 0);

-- AddCheckConstraint
ALTER TABLE "coupons"
ADD CONSTRAINT "coupons_value_integrity_check" CHECK (
    "coupon_value" > 0
    AND ("coupon_type" <> 'PERCENT_DISCOUNT' OR "coupon_value" <= 100)
    AND ("min_order_amount" IS NULL OR "min_order_amount" > 0)
    AND ("max_uses" IS NULL OR "max_uses" > 0)
    AND "max_uses_per_user" > 0
);

-- AddCheckConstraint
ALTER TABLE "viewing_credits"
ADD CONSTRAINT "viewing_credits_usage_integrity_check" CHECK (
    "total_credits" >= 0
    AND "used_credits" >= 0
    AND "used_credits" <= "total_credits"
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("coupon_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_cancellations" ADD CONSTRAINT "payment_cancellations_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_usages" ADD CONSTRAINT "coupon_usages_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("coupon_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupon_usages" ADD CONSTRAINT "coupon_usages_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewing_credits" ADD CONSTRAINT "viewing_credits_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Restore valid rows from the pre-hardening PortOne deployment. The complete
-- originals remain in payment_pre_portone for audit and manual reconciliation.
DO $$
BEGIN
    IF to_regclass('payment_pre_portone.products') IS NULL THEN
        RETURN;
    END IF;

    EXECUTE $copy$
        INSERT INTO public.products (
            product_id, product_code, product_name, product_name_en,
            product_category, price, description, is_active, metadata,
            created_at, updated_at
        )
        SELECT product_id, product_code, product_name, product_name_en,
               product_category::text::public."ProductCategory", price,
               description, is_active, metadata, created_at, updated_at
        FROM payment_pre_portone.products
        WHERE price > 0
        ON CONFLICT (product_id) DO NOTHING
    $copy$;

    IF to_regclass('payment_pre_portone.coupons') IS NOT NULL THEN
        EXECUTE $copy$
            INSERT INTO public.coupons (
                coupon_id, coupon_code, coupon_name, coupon_type, coupon_value,
                target_product, min_order_amount, max_uses, used_count,
                max_uses_per_user, starts_at, expires_at, is_active, created_at
            )
            SELECT coupon_id, coupon_code, coupon_name,
                   coupon_type::text::public."CouponType", coupon_value,
                   CASE WHEN target_product IS NULL THEN NULL
                        ELSE target_product::text::public."ProductCategory" END,
                   min_order_amount, max_uses, used_count, max_uses_per_user,
                   starts_at, expires_at, is_active, created_at
            FROM payment_pre_portone.coupons
            WHERE coupon_value > 0
              AND (coupon_type::text <> 'PERCENT_DISCOUNT' OR coupon_value <= 100)
              AND (min_order_amount IS NULL OR min_order_amount > 0)
              AND (max_uses IS NULL OR max_uses > 0)
              AND max_uses_per_user > 0
            ON CONFLICT (coupon_id) DO NOTHING
        $copy$;
    END IF;

    IF to_regclass('payment_pre_portone.orders') IS NOT NULL THEN
        EXECUTE $copy$
            INSERT INTO public.orders (
                order_id, order_no, user_id, product_id, target_job_id, quantity,
                total_amount, original_amount, coupon_id, status, currency,
                fulfillment_status, fulfillment_attempts, fulfilled_at,
                created_at, updated_at
            )
            SELECT o.order_id, o.order_no, o.user_id, o.product_id, o.target_job_id,
                   o.quantity, o.total_amount, o.original_amount,
                   CASE WHEN c.coupon_id IS NULL THEN NULL ELSE o.coupon_id END,
                   o.status::text::public."OrderStatus", 'KRW',
                   CASE WHEN o.status::text = 'PAID'
                        THEN 'FULFILLED'::public."FulfillmentStatus"
                        ELSE 'PENDING'::public."FulfillmentStatus" END,
                   0,
                   CASE WHEN o.status::text = 'PAID' THEN o.updated_at ELSE NULL END,
                   o.created_at, o.updated_at
            FROM payment_pre_portone.orders o
            JOIN public.products p ON p.product_id = o.product_id
            LEFT JOIN public.coupons c ON c.coupon_id = o.coupon_id
            WHERE o.quantity > 0
              AND o.total_amount > 0
              AND o.original_amount > 0
              AND o.total_amount <= o.original_amount
            ON CONFLICT (order_id) DO NOTHING
        $copy$;
    END IF;

    IF to_regclass('payment_pre_portone.payments') IS NOT NULL THEN
        EXECUTE $copy$
            INSERT INTO public.payments (
                payment_id, order_id, portone_payment_id, method, status,
                store_id, currency, paid_amount, paid_at, receipt_url, card_info,
                cancelled_amount, cancelled_at, cancel_reason, webhook_data,
                fail_reason, last_synced_at, created_at, updated_at
            )
            SELECT p.payment_id, p.order_id, p.portone_payment_id,
                   p.method::text::public."PaymentMethod",
                   p.status::text::public."PaymentStatus",
                   'legacy-unverified', 'KRW', p.paid_amount, p.paid_at,
                   p.receipt_url, p.card_info, NULLIF(p.cancelled_amount, 0),
                   p.cancelled_at, p.cancel_reason, NULL, p.fail_reason,
                   p.updated_at, p.created_at, p.updated_at
            FROM payment_pre_portone.payments p
            JOIN public.orders o ON o.order_id = p.order_id
            WHERE (p.paid_amount IS NULL OR p.paid_amount > 0)
              AND (p.cancelled_amount IS NULL OR p.cancelled_amount >= 0)
              AND (p.paid_amount IS NULL OR p.cancelled_amount IS NULL
                   OR p.cancelled_amount <= p.paid_amount)
            ON CONFLICT (payment_id) DO NOTHING
        $copy$;
    END IF;

    IF to_regclass('payment_pre_portone.coupon_usages') IS NOT NULL THEN
        EXECUTE $copy$
            INSERT INTO public.coupon_usages (
                usage_id, coupon_id, user_id, order_id, used_at
            )
            SELECT u.usage_id, u.coupon_id, u.user_id, NULL, u.used_at
            FROM payment_pre_portone.coupon_usages u
            JOIN public.coupons c ON c.coupon_id = u.coupon_id
            ON CONFLICT (usage_id) DO NOTHING
        $copy$;
    END IF;

    IF to_regclass('payment_pre_portone.viewing_credits') IS NOT NULL THEN
        EXECUTE $copy$
            INSERT INTO public.viewing_credits (
                credit_id, user_id, total_credits, used_credits, source,
                order_id, expires_at, created_at
            )
            SELECT credit_id, user_id, total_credits, used_credits, source,
                   NULL, expires_at, created_at
            FROM payment_pre_portone.viewing_credits
            WHERE total_credits >= 0 AND used_credits >= 0
              AND used_credits <= total_credits
            ON CONFLICT (credit_id) DO NOTHING
        $copy$;
    END IF;

    IF to_regclass('payment_pre_portone.viewing_logs') IS NOT NULL THEN
        EXECUTE $copy$
            INSERT INTO public.viewing_logs (
                log_id, user_id, resume_id, credit_id, viewed_at
            )
            SELECT DISTINCT ON (user_id, resume_id)
                   log_id, user_id, resume_id, NULL, viewed_at
            FROM payment_pre_portone.viewing_logs
            ORDER BY user_id, resume_id, viewed_at DESC, log_id DESC
            ON CONFLICT (user_id, resume_id) DO NOTHING
        $copy$;
    END IF;

    PERFORM setval(pg_get_serial_sequence('public.products', 'product_id'),
                   COALESCE((SELECT MAX(product_id) FROM public.products), 1),
                   EXISTS (SELECT 1 FROM public.products));
    PERFORM setval(pg_get_serial_sequence('public.orders', 'order_id'),
                   COALESCE((SELECT MAX(order_id) FROM public.orders), 1),
                   EXISTS (SELECT 1 FROM public.orders));
    PERFORM setval(pg_get_serial_sequence('public.payments', 'payment_id'),
                   COALESCE((SELECT MAX(payment_id) FROM public.payments), 1),
                   EXISTS (SELECT 1 FROM public.payments));
    PERFORM setval(pg_get_serial_sequence('public.coupons', 'coupon_id'),
                   COALESCE((SELECT MAX(coupon_id) FROM public.coupons), 1),
                   EXISTS (SELECT 1 FROM public.coupons));
    PERFORM setval(pg_get_serial_sequence('public.coupon_usages', 'usage_id'),
                   COALESCE((SELECT MAX(usage_id) FROM public.coupon_usages), 1),
                   EXISTS (SELECT 1 FROM public.coupon_usages));
    PERFORM setval(pg_get_serial_sequence('public.viewing_credits', 'credit_id'),
                   COALESCE((SELECT MAX(credit_id) FROM public.viewing_credits), 1),
                   EXISTS (SELECT 1 FROM public.viewing_credits));
    PERFORM setval(pg_get_serial_sequence('public.viewing_logs', 'log_id'),
                   COALESCE((SELECT MAX(log_id) FROM public.viewing_logs), 1),
                   EXISTS (SELECT 1 FROM public.viewing_logs));
END $$;
