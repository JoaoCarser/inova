import { Global, Module } from '@nestjs/common';
import { UsersRepositories } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';
import { BasesRepositories } from './repositories/bases.repositories';
import { PeriodsRepositories } from './repositories/periods.repositories';
import { QuestionsRepositories } from './repositories/questions.repositories';
import { ProjectsRepositories } from './repositories/projects.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepositories,
    BasesRepositories,
    PeriodsRepositories,
    QuestionsRepositories,
    ProjectsRepositories,
  ],
  exports: [
    UsersRepositories,
    BasesRepositories,
    PeriodsRepositories,
    QuestionsRepositories,
    ProjectsRepositories,
  ],
})
export class DatabaseModule {}
