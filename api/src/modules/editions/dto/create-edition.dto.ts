import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ValidateIf,
  Validate,
  IsArray,
  IsNumber,
} from 'class-validator';
import { CreatePeriodDto } from 'src/modules/periods/dto/create-period.dto';
import { IsStartBeforeEnd } from 'src/shared/validators/IsStartBeforeEnd';

export class CreateEditionDto {
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

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @Validate(IsStartBeforeEnd, ['startDate', 'endDate']) // validar start < end
  dummyValidationField: any; // gambiarra necessária no class-validator, já te explico

  @IsArray({ message: 'O campo periodos é obrigatório' })
  @ValidateNested({ each: true })
  @Type(() => CreatePeriodDto)
  periods: CreatePeriodDto[];
}
