import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { StatusQuestionType } from '../entities/question.entity';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsEnum(StatusQuestionType)
  status: StatusQuestionType;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  projectId: string;
}
