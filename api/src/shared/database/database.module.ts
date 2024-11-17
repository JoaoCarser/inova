import { Global, Module } from '@nestjs/common';
import { UsersRepositories } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';
import { BasesRepositories } from './repositories/bases.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepositories, BasesRepositories],
  exports: [UsersRepositories, BasesRepositories],
})
export class DatabaseModule {}
