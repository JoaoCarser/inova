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

export class SignUpDto {
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

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsCPF({ message: 'CPF inválido' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  baseId: string;
}
