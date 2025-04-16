import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsEvaulationCommitee } from 'src/shared/decorators/IsEvaluationCommitee';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Post()
  create(
    @IsEvaulationCommitee() _isEvaluationCommitee: boolean,
    @ActiveUserId() userId: string,
    @Body() createEvaluationDto: CreateEvaluationDto,
  ) {
    return this.evaluationsService.create(userId, createEvaluationDto);
  }

  @Get()
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Get(':evaluationId')
  findOne(@Param('evaluationId', ParseUUIDPipe) evaluationId: string) {
    return this.evaluationsService.findOne(evaluationId);
  }

  @Put(':evaluationId')
  update(
    @ActiveUserId() userId: string,
    @Param('evaluationId') evaluationId: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationsService.update(
      userId,
      evaluationId,
      updateEvaluationDto,
    );
  }

  @Delete(':evaluationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('evaluationId', ParseUUIDPipe) evaluationId: string) {
    return this.evaluationsService.remove(evaluationId);
  }
}
