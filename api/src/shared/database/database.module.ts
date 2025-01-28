import { Global, Module } from '@nestjs/common';
import { UsersRepositories } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';
import { BasesRepositories } from './repositories/bases.repositories';
import { PeriodsRepositories } from './repositories/periods.repositories';
import { QuestionsRepositories } from './repositories/questions.repositories';
import { ProjectsRepositories } from './repositories/projects.repositories';
import { UsersProjectsRepositories } from './repositories/users-projects.repositories';
import { FilesRepositories } from './repositories/files.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepositories,
    BasesRepositories,
    PeriodsRepositories,
    QuestionsRepositories,
    ProjectsRepositories,
    UsersProjectsRepositories,
    FilesRepositories,
  ],
  exports: [
    UsersRepositories,
    BasesRepositories,
    PeriodsRepositories,
    QuestionsRepositories,
    ProjectsRepositories,
    UsersProjectsRepositories,
    FilesRepositories,
  ],
})
export class DatabaseModule {}
