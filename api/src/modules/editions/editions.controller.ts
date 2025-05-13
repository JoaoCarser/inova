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
import { EditionsService } from './editions.service';
import { CreateEditionDto } from './dto/create-edition.dto';
import { UpdateEditionDto } from './dto/update-edition.dto';

@Controller('editions')
export class EditionsController {
  constructor(private readonly editionsService: EditionsService) {}

  @Post()
  create(@Body() createEditionDto: CreateEditionDto) {
    return this.editionsService.create(createEditionDto);
  }

  @Get()
  findAll() {
    return this.editionsService.findAll();
  }

  @Get('/current')
  findOne() {
    return this.editionsService.findCurrent();
  }

  @Put(':editionId')
  update(
    @Param('editionId') editionId: string,
    @Body() updateEditionDto: UpdateEditionDto,
  ) {
    return this.editionsService.update(editionId, updateEditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editionsService.remove(+id);
  }
}
