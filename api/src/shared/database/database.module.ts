import { Global, Module } from '@nestjs/common';
import { UsersRepositories } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';
import { BasesRepositories } from './repositories/bases.repositories';
import { PeriodsRepository } from './repositories/periods.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepositories, BasesRepositories, PeriodsRepository],
  exports: [UsersRepositories, BasesRepositories, PeriodsRepository],
})
export class DatabaseModule {}
