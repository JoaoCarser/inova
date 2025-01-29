import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { EvaluationCriterionName } from '../entities/evaluation.entity';

export class CreateCriteriaDto {
  @IsEnum(EvaluationCriterionName)
  @IsNotEmpty()
  name: EvaluationCriterionName;

  @IsInt()
  @Min(1)
  @Max(10)
  score: number;
}
