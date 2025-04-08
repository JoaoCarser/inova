/*
  Warnings:

  - Added the required column `department` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "project_departments" AS ENUM ('HR', 'LOGISTICS', 'MARKETING', 'SALES', 'FINANCIAL');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "department" "project_departments" NOT NULL;
