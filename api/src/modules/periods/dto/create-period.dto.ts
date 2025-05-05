import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { PeriodType } from '../entities/period.entity';
import { IsStartBeforeEnd } from 'src/shared/validators/IsStartBeforeEnd';

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

  @Validate(IsStartBeforeEnd, ['startDate', 'endDate'])
  dummyValidationField: any;
}
