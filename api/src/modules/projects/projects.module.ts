import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersService } from '../users/users.service';
import { UsersProjectsService } from '../users-projects/users-projects.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService, UsersProjectsService],
})
export class ProjectsModule {}
