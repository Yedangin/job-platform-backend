/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `corporate_registrations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `member_identity_verifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "corporate_registrations_user_id_key" ON "corporate_registrations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "member_identity_verifications_user_id_key" ON "member_identity_verifications"("user_id");
