import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusProject } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(StatusProject)
  @IsNotEmpty()
  status: StatusProject;
}
