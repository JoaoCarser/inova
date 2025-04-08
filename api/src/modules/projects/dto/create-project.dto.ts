import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusProject } from '../entities/status.project.entity';
import { ProjectDepartment } from '../entities/project.department.entity';

export class CreateProjectDto {
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
}
