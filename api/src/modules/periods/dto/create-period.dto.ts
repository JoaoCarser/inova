import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { PeriodType } from '../entities/period.entity';

export class CreatePeriodDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  @IsEnum(PeriodType)
  type: PeriodType;
}
