/*
  Warnings:

  - Added the required column `year` to the `editions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "editions" ADD COLUMN     "year" INTEGER NOT NULL;
