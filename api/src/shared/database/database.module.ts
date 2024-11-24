import { Global, Module } from '@nestjs/common';
import { UsersRepositories } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';
import { BasesRepositories } from './repositories/bases.repositories';
import { PeriodsRepository } from './repositories/periods.repositories';
import { QuestionsRepositories } from './repositories/questions.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepositories,
    BasesRepositories,
    PeriodsRepository,
    QuestionsRepositories,
  ],
  exports: [
    UsersRepositories,
    BasesRepositories,
    PeriodsRepository,
    QuestionsRepositories,
  ],
})
export class DatabaseModule {}
