import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

import { IsCPF } from 'class-validator-cpf';
import { Role } from '../entities/Role';

export class AdminSignupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsCPF({ message: 'CPF inválido' })
  cpf: string;
}
