import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsAdmUser } from 'src/shared/decorators/IsAdmUser';
import { StatusProject } from './entities/status.project.entity';
import { ProjectDepartment } from './entities/project.department.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(userId, createProjectDto);
  }

  @Get()
  findAll(
    @IsAdmUser() _isAdmUser: boolean,
    @Query('status') status?: StatusProject[] | StatusProject,
    @Query('department') department?: ProjectDepartment[] | ProjectDepartment,
  ) {
    const normalizedStatus = Array.isArray(status)
      ? status
      : status
        ? [status]
        : [];
    const normalizedDepartment = Array.isArray(department)
      ? department
      : department
        ? [department]
        : [];
    return this.projectsService.findAll({
      status: normalizedStatus,
      department: normalizedDepartment,
    });
  }

  @Get('/user/:userId')
  findAllByUserId(
    @Param('userId') userId: string,
    @Query('status') status?: StatusProject[] | StatusProject,
    @Query('department') department?: ProjectDepartment[] | ProjectDepartment,
    @Query('title') title?: string,
  ) {
    const normalizedStatus = Array.isArray(status)
      ? status
      : status
        ? [status]
        : [];
    const normalizedDepartment = Array.isArray(department)
      ? department
      : department
        ? [department]
        : [];

    return this.projectsService.findAll({
      userId,
      status: normalizedStatus,
      department: normalizedDepartment,
      title,
    });
  }

  @Get(':projectId')
  findOne(
    @ActiveUserId() userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.projectsService.findByProjectId(userId, projectId);
  }

  @Put(':projectId')
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(projectId, updateProjectDto);
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('projectId') projectId: string,
    @ActiveUserId() userId: string,
  ) {
    return this.projectsService.remove(projectId, userId);
  }
}
