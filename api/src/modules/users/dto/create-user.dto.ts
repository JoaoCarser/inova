import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/Role';
import { IsCPF } from 'class-validator-cpf';

export class CreateUserDto {
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
