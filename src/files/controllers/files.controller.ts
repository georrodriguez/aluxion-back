import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
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

  @Get('unsplash/search')
  getUnsplashImages(
    @Query('search') search: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 1,
  ) {
    const dataInfo = {
      query: search,
      page: page,
      perPage: perPage,
    };
    if (!search) {
      throw new NotFoundException(`You must set query`);
    }
    try {
      return this.filesService.searchByQuery(dataInfo);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post('unsplash/:id')
  create(@Param('id') id: string) {
    return this.filesService.downloadById(id);
  }

  @Get(':id')
  getUser(@Param('id', MongoIdPipe) id: string) {
    return this.filesService.getFile(id);
  }

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
