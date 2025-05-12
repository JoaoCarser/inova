import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersProjectsService } from '../users-projects/users-projects.service';
import { FilesService } from '../files/files.service';
import { PeriodsService } from '../periods/periods.service';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    UsersService,
    ProjectsService,
    UsersProjectsService,
    FilesService,
    PeriodsService
  ],
})
export class QuestionsModule {}
