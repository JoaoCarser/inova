import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(userId, createQuestionDto);
  }

  // Rota para listar as peguntas feitas pelo usuário logado (ou que o usuário criou)
  @Get('/me')
  findAllByUserId(@ActiveUserId() userId: string) {
    return this.questionsService.findAllByUserId(userId);
  }

  @Get(':questionId')
  findFirstById(@ActiveUserId() userId: string, questionId: string) {
    return this.questionsService.findFirstById(userId, questionId);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
