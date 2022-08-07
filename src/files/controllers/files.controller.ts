import { Controller, Get } from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}
  @Get()
  getUsers(): any {
    return this.filesService.getAll();
  }
}
