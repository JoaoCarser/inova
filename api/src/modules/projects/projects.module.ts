import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersService } from '../users/users.service';
import { UsersProjectsService } from '../users-projects/users-projects.service';
import { FilesModule } from '../files/files.module'; // <-- importar com forwardRef
import { FilesService } from '../files/files.service';
import { PeriodsService } from '../periods/periods.service';

@Module({
  imports: [forwardRef(() => FilesModule)], // ✅
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    UsersService,
    UsersProjectsService,
    FilesService,
    PeriodsService
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
