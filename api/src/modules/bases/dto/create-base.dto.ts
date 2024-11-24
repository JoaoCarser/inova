import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}
