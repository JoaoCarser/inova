-- CreateEnum
CREATE TYPE "period_type" AS ENUM ('SUBSCRIPTION', 'AVALIATION', 'RESUBSCRIPTION', 'REAVALIATION', 'FINAL', 'INACTIVE');

-- CreateTable
CREATE TABLE "periods" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "type" "period_type" NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);
