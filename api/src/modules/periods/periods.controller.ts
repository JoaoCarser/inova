import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(+id, updatePeriodDto);
  }

  @Delete(':periodId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('periodId', ParseUUIDPipe) periodId: string) {
    return this.periodsService.remove(periodId);
  }
}
