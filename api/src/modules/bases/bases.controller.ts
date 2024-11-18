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
import { BasesService } from './bases.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';

@Controller('bases')
export class BasesController {
  constructor(private readonly basesService: BasesService) {}

  @Post()
  async create(@Body() createBaseDto: CreateBaseDto) {
    return await this.basesService.create(createBaseDto);
  }

  @Get()
  async findAll() {
    return await this.basesService.findMany();
  }

  @Get(':baseId')
  findOne(@Param('baseId', ParseUUIDPipe) baseId: string) {
    return this.basesService.findOne(baseId);
  }

  @Put(':baseId')
  async update(
    @Param('baseId', ParseUUIDPipe) baseId: string,
    @Body() updateBaseDto: UpdateBaseDto,
  ) {
    return await this.basesService.update(baseId, updateBaseDto);
  }

  @Delete(':baseId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('baseId', ParseUUIDPipe) baseId: string) {
    return await this.basesService.remove(baseId);
  }
}
