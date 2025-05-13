import { Global, Module } from '@nestjs/common';
import { UsersRepositories } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';
import { BasesRepositories } from './repositories/bases.repositories';
import { PeriodsRepositories } from './repositories/periods.repositories';
import { QuestionsRepositories } from './repositories/questions.repositories';
import { ProjectsRepositories } from './repositories/projects.repositories';
import { UsersProjectsRepositories } from './repositories/users-projects.repositories';
import { FilesRepositories } from './repositories/files.repositories';
import { EvaluationsRepositories } from './repositories/evaluations.repositories';
import { EvaluationsCriteriaRepositories } from './repositories/evaluations-criteria.repositories';
import { EditionsRepositories } from './repositories/editions.repositories';
import { TokensRepositories } from './repositories/tokens.repositories';

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
    EvaluationsRepositories,
    EvaluationsCriteriaRepositories,
    EditionsRepositories,
    TokensRepositories,
  ],
  exports: [
    UsersRepositories,
    BasesRepositories,
    PeriodsRepositories,
    QuestionsRepositories,
    ProjectsRepositories,
    UsersProjectsRepositories,
    FilesRepositories,
    EvaluationsRepositories,
    EvaluationsCriteriaRepositories,
    EditionsRepositories,
    TokensRepositories,
  ],
})
export class DatabaseModule {}
