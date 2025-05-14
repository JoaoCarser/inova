/*
  Warnings:

  - You are about to drop the column `departament_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Departament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_departament_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "departament_id",
ADD COLUMN     "department_id" UUID;

-- DropTable
DROP TABLE "Departament";

-- CreateTable
CREATE TABLE "Department" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
