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
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsMarketingUser } from 'src/shared/decorators/IsMarketingUser';
import { IsEvaulationCommitee } from 'src/shared/decorators/IsEValuationCommitee';
import { IsAdmUser } from 'src/shared/decorators/IsAdmUser';

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

  @Get('submitted')
  findAllSubmitted(@IsEvaulationCommitee() isEvaulationCommitee: boolean) {
    return this.projectsService.findAllSubmitted();
  }

  @Get()
  findAll(@IsAdmUser() isAdmUser: boolean) {
    return this.projectsService.findAll();
  }

  @Get(':projectId')
  findOne(@Param('projectId') projectId: string) {
    return this.projectsService.findOne(projectId);
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
