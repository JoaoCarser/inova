/*
  Warnings:

  - You are about to drop the column `state_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_state_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "state_id",
ADD COLUMN     "departament_id" UUID;

-- DropTable
DROP TABLE "State";

-- DropEnum
DROP TYPE "UF";

-- CreateTable
CREATE TABLE "Departament" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Departament_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Departament_name_key" ON "Departament"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_departament_id_fkey" FOREIGN KEY ("departament_id") REFERENCES "Departament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
