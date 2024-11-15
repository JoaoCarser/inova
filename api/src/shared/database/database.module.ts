import { Global, Module } from '@nestjs/common';
import { UsersRepositories } from './repositories/users.repositories';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [UsersRepositories, PrismaService],
  exports: [UsersRepositories],
})
export class DatabaseModule {}
