import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsEvaulationCommitee } from 'src/shared/decorators/IsEValuationCommitee';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(+id);
  }

  @Put(':evaluationId')
  update(
    @Param('evaluationId') evaluationId: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationsService.update(evaluationId, updateEvaluationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationsService.remove(+id);
  }
}
