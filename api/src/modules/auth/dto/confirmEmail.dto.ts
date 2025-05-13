import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString({ message: 'Token deve ser uma string' })
  @IsNotEmpty({ message: 'Token é obrigatório' })
  token: string;
}
