-- CreateEnum
CREATE TYPE "role" AS ENUM ('PARTICIPANT', 'EVALUATION_COMMITTEE', 'MARKETING');

-- CreateEnum
CREATE TYPE "token_types" AS ENUM ('CONFIRM_EMAIL', 'RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "status_projects" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REVIEWED');

-- CreateEnum
CREATE TYPE "project_departments" AS ENUM ('HR', 'LOGISTICS', 'MARKETING', 'SALES', 'FINANCIAL');

-- CreateEnum
CREATE TYPE "status_questions" AS ENUM ('SUBMITED', 'VIEWED', 'COMPLETED', 'ANSWERED', 'PENDING');

-- CreateEnum
CREATE TYPE "period_type" AS ENUM ('SUBSCRIPTION', 'AVALIATION', 'RESUBSCRIPTION', 'REAVALIATION', 'FINAL', 'INACTIVE');

-- CreateEnum
CREATE TYPE "EvaluationCriterionName" AS ENUM ('CREATIVITY', 'ORIGINALITY', 'UTILITY', 'FEASIBILITY', 'IMPACT', 'STRATEGIC_ALIGNMENT', 'CLARITY', 'TECHNICAL_FEASIBILITY', 'INNOVATION');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isEmailConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "cpf" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "base_id" UUID,
    "department_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" UUID NOT NULL,
    "token" TEXT NOT NULL,
    "type" "token_types" NOT NULL,
    "userId" UUID NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bases" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "bases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video_link" TEXT,
    "department" "project_departments" NOT NULL,
    "status" "status_projects" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "edition_id" UUID NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_projects" (
    "user_id" UUID NOT NULL,
    "project_id" UUID NOT NULL,

    CONSTRAINT "users_projects_pkey" PRIMARY KEY ("user_id","project_id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "path" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "project_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "status" "status_questions" NOT NULL DEFAULT 'SUBMITED',
    "response" TEXT,
    "project_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responded_at" TIMESTAMP(3),

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editions" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periods" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "type" "period_type" NOT NULL,
    "edition_id" UUID NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "evaluator_id" UUID NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_criteria" (
    "id" UUID NOT NULL,
    "evaluation_id" UUID NOT NULL,
    "name" "EvaluationCriterionName" NOT NULL,
    "score" SMALLINT NOT NULL,

    CONSTRAINT "evaluation_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bases_name_key" ON "bases"("name");

-- CreateIndex
CREATE UNIQUE INDEX "evaluations_project_id_evaluator_id_key" ON "evaluations"("project_id", "evaluator_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "bases"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "periods" ADD CONSTRAINT "periods_edition_id_fkey" FOREIGN KEY ("edition_id") REFERENCES "editions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluation_criteria" ADD CONSTRAINT "evaluation_criteria_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
