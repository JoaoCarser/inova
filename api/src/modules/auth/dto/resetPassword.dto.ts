import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'Token deve ser uma string' })
  @IsNotEmpty({ message: 'Token é obrigatório' })
  token: string;

  @IsString({ message: 'A senha precisa ser uma String!' })
  @IsNotEmpty({ message: 'A senha é obrigatória!' })
  @MinLength(8)
  password: string;
}
