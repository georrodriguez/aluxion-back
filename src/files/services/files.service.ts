import { Injectable } from '@nestjs/common';
import { File } from '../entities/file.entity';

@Injectable()
export class FilesService {
  private files: File[] = [
    {
      id: 1,
      name: 'files',
      lastname: 'Rodriguez',
      userName: 'pabloRod1',
      password: '13232',
      email: 'pabloRod1@gmail.com',
    },
  ];

  getAll() {
    return this.files;
  }
}
