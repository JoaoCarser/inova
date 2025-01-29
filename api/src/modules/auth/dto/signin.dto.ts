import { MinLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsString({ message: 'A email precisa ser uma String!' })
  @IsNotEmpty({ message: 'O email é obrigatório!' })
  @IsEmail()
  email: string;

  @IsString({ message: 'A senha precisa ser uma String!' })
  @IsNotEmpty({ message: 'A senha é obrigatória!' })
  @MinLength(2)
  password: string;
}
