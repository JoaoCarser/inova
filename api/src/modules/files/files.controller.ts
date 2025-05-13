import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  ParseUUIDPipe,
  UploadedFile,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/project/:projectId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProjectFile(
    @ActiveUserId() userId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo inválido!');
    }

    await this.filesService.uploadProjectFile(file, userId, projectId);
  }

  @Delete('/project/:projectId/:fileId')
  async deleteProjectFile(
    @ActiveUserId() userId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('fileId', ParseUUIDPipe) fileId: string,
  ) {
    await this.filesService.deleteProjectFile(fileId, userId, projectId);
  }
}
