import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { FilesService } from '../../files/services/files.service';
/* import { ConfigService } from '@nestjs/config'; */

@Injectable()
export class UsersService {
  constructor(
    private filesService: FilesService /* ,private configService: ConfigService, */,
  ) {}
  private users: User[] = [
    {
      id: 1,
      name: 'Pablo',
      lastname: 'Rodriguez',
      userName: 'pabloRod1',
      password: '13232',
      email: 'pabloRod1@gmail.com',
    },
  ];

  getAll() {
    /*
    const api = this.configService.get('NODE_AWS_KEY'); */
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    } else {
      return user;
    }
  }

  getFilesByUser(id: number) {
    const user = this.getUser(id);
    return {
      user: user,
      files: this.filesService.getAll(),
    };
  }

  createUser(payload: CreateUserDto) {
    console.log('payload', payload);
    const newUser = {
      id: 34,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  editUser(id: number, payload: UpdateUserDto) {
    const user = this.getUser(id);
    const idx = this.users.findIndex((user) => user.id === id);
    this.users[idx] = {
      ...user,
      ...payload,
    };
    return this.users[idx];
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.users.splice(index, 1);
    return `User ${id} deleted!`;
  }
}
