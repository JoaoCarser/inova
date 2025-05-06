import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { StatusProject } from '../entities/status.project.entity';
import { ProjectDepartment } from '../entities/project.department.entity';
import { Type } from 'class-transformer';

class Participant {
  id: string;
  name: string;
  email: string;
}

export class CreateProjectDto {
  @IsUUID()
  @IsNotEmpty()
  editionId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  videoLink: string;

  @IsEnum(StatusProject)
  @IsNotEmpty()
  status: StatusProject;

  @IsEnum(ProjectDepartment)
  @IsNotEmpty()
  department: ProjectDepartment;

  @ValidateNested({ each: true })
  @Type(() => Participant)
  participants: Participant[];
}
