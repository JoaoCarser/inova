import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { IsEvaulationCommitee } from 'src/shared/decorators/IsEValuationCommitee';

@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  async create(@Body() createPeriodDto: CreatePeriodDto) {
    return await this.periodsService.create(createPeriodDto);
  }

  @Get()
  findAll() {
    return this.periodsService.findAll();
  }

  @Get(':periodId')
  findOne(@Param('periodId', ParseUUIDPipe) periodId: string) {
    return this.periodsService.findPeriodById(periodId);
  }

  @Put(':periodId')
  update(
    @Param('periodId', ParseUUIDPipe) periodId: string,
    @Body() updatePeriodDto: UpdatePeriodDto,
  ) {
    return this.periodsService.update(periodId, updatePeriodDto);
  }

  @Delete(':periodId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('periodId', ParseUUIDPipe) periodId: string) {
    return this.periodsService.remove(periodId);
  }
}
