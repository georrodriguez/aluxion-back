import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { CreateFileDto, UpdateFileDto } from '../dtos/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}
  @Get()
  getUsers(): any {
    return this.filesService.getAll();
  }

  @Get(':id')
  getUser(@Param('id', MongoIdPipe) id: string) {
    return this.filesService.getFile(id);
  }

  /* @Post()
  create(@Body() payload: CreateFileDto) {
    return this.filesService.createFile(payload);
  } */

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    return await this.filesService.upload(file);
  }

  @Patch(':id')
  update(@Param('id', MongoIdPipe) id: any, @Body() payload: UpdateFileDto) {
    return this.filesService.editFile(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: any) {
    return this.filesService.deleteFile(id);
  }
}
