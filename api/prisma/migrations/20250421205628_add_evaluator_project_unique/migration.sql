/*
  Warnings:

  - A unique constraint covering the columns `[project_id,evaluator_id]` on the table `evaluations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "evaluations_project_id_evaluator_id_key" ON "evaluations"("project_id", "evaluator_id");
