import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ProjectsService } from '../projects/projects.service';
import { UsersProjectsModule } from '../users-projects/users-projects.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersProjectsModule, UsersModule],
  controllers: [FilesController],
  providers: [FilesService, ProjectsService],
})
export class FilesModule {}
