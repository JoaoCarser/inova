/*
  Warnings:

  - The values [SUBMITED] on the enum `status_projects` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_projects_new" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REVIEWED');
ALTER TABLE "projects" ALTER COLUMN "status" TYPE "status_projects_new" USING ("status"::text::"status_projects_new");
ALTER TYPE "status_projects" RENAME TO "status_projects_old";
ALTER TYPE "status_projects_new" RENAME TO "status_projects";
DROP TYPE "status_projects_old";
COMMIT;
