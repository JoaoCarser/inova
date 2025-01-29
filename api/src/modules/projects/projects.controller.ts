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
import { IsEvaulationCommitee } from 'src/shared/decorators/IsEvaluationCommitee';
import { StatusProject } from './entities/status.project.entity';

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
    @Query('status') status: StatusProject,
  ) {
    return this.projectsService.findAll({ status });
  }

  @Get(':projectId')
  findOne(@Param('projectId') projectId: string) {
    return this.projectsService.findByProjectId(projectId);
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
  remove(@Param('projectId') projectId: string) {
    return this.projectsService.remove(projectId);
  }
}
