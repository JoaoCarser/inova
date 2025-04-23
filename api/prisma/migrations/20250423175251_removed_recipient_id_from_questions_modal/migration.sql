/*
  Warnings:

  - You are about to drop the column `recipient_id` on the `questions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_recipient_id_fkey";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "recipient_id";
