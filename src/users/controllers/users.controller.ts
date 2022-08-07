import { ApiTags } from '@nestjs/swagger';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(): any {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Get(':id/files')
  getUserFiles(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFilesByUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: any, @Body() payload: UpdateUserDto) {
    return this.usersService.editUser(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: any) {
    return this.usersService.deleteUser(id);
  }
}
