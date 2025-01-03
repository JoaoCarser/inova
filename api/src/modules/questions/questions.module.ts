import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, UsersService],
})
export class QuestionsModule {}
