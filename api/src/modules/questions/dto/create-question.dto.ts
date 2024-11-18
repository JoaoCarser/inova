import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusQuestionType } from '../entities/question.entity';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsEnum(StatusQuestionType)
  status: StatusQuestionType;
}
