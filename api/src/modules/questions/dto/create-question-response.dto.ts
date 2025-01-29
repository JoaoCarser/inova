import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionResponseDto {
  @IsNotEmpty()
  @IsString()
  response: string;
}
