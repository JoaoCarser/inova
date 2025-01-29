/*
  Warnings:

  - You are about to drop the column `created_by` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `sent_to` on the `questions` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient_id` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_created_by_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_sent_to_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "created_by",
DROP COLUMN "sent_to",
ADD COLUMN     "author_id" UUID NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "recipient_id" UUID NOT NULL,
ADD COLUMN     "responded_at" TIMESTAMP(3),
ADD COLUMN     "response" TEXT;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
