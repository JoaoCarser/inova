import { Module } from '@nestjs/common';
import { UsersProjectsService } from './users-projects.service';

@Module({
  providers: [UsersProjectsService],
})
export class UsersProjectsModule {}
