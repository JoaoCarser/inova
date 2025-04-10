import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UsersProjectsModule } from '../users-projects/users-projects.module';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { FilesRepositories } from 'src/shared/database/repositories/files.repositories';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  imports: [
    UsersProjectsModule,
    UsersModule,
    forwardRef(() => ProjectsModule), // ✅
    ConfigModule,
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesRepositories, PrismaService],
})
export class FilesModule {}
