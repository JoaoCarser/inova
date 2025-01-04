import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService],
})
export class ProjectsModule {}