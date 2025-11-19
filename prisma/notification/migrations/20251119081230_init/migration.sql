-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('APPLICATION_ALERT', 'INTERVIEW_UPDATE', 'REMINDER', 'PROMOTION', 'EMAIL_VERIFICATION', 'FINANCIAL_ALERT', 'STATUS_ALERT');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENDING', 'FAILED');

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" VARCHAR(50),
    "subject" VARCHAR(100),
    "content" VARCHAR(255),
    "notification_type" "NotificationType" NOT NULL DEFAULT 'REMINDER',
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "priority" INTEGER,
    "attempts" INTEGER,
    "max_attempts" INTEGER,
    "metadata" VARCHAR(255),
    "is_read" BOOLEAN,
    "related_interview_id" TEXT,
    "related_job_post_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sended_at" TIMESTAMP(3),
    "failed_at" TIMESTAMP(3),
    "error_message" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "user_one" TEXT NOT NULL,
    "user_two" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "room" VARCHAR(255),
    "message" VARCHAR(255),
    "is_seen" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notifications_email_idx" ON "notifications"("email");

-- CreateIndex
CREATE INDEX "notifications_subject_idx" ON "notifications"("subject");

-- CreateIndex
CREATE INDEX "notifications_notification_type_idx" ON "notifications"("notification_type");

-- CreateIndex
CREATE INDEX "notifications_metadata_idx" ON "notifications"("metadata");
