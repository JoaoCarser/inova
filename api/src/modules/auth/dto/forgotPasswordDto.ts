import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsString({ message: 'Token deve ser uma string' })
  @IsEmail()
  email: string;

  
}
