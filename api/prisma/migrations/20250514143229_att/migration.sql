-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_base_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_state_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "base_id" DROP NOT NULL,
ALTER COLUMN "state_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE SET NULL ON UPDATE CASCADE;
