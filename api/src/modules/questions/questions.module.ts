import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';
import { UsersProjectsService } from '../users-projects/users-projects.service';

@Module({
  controllers: [QuestionsController],
  providers: [
    QuestionsService,
    UsersService,
    ProjectsService,
    UsersProjectsService,
  ],
})
export class QuestionsModule {}
