/* model Evaluation {
  id          String @id @default(uuid()) @db.Uuid
  projectId   String @map("project_id") @db.Uuid
  evaluatorId String @map("evaluator_id") @db.Uuid

  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  evaluator User    @relation(fields: [evaluatorId], references: [id], onDelete: Cascade)

  comments  String? // Comentários gerais
  createdAt DateTime @default(now()) @map("created_at")

  criteria EvaluationCriteria[] // Relação com os critérios avaliados

  @@map("evaluations")
}

model EvaluationCriteria {
  id           String                  @id @default(uuid()) @db.Uuid
  evaluationId String                  @map("evaluation_id") @db.Uuid
  name         EvaluationCriterionName // Nome do critério (ex: criatividade, originalidade)
  score        Int                     @db.SmallInt // Nota atribuída ao critério

  evaluation Evaluation @relation(fields: [evaluationId], references: [id], onDelete: Cascade)

  @@map("evaluation_criteria")
} */

import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateCriteriaDto } from './create-criteria.dto';

export class CreateEvaluationDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsOptional()
  comments: string;

  @ValidateNested({ each: true })
  @Type(() => CreateCriteriaDto)
  criteria: CreateCriteriaDto[];
}
