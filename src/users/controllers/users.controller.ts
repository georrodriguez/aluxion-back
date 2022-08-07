import { ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from '../../auth/guards/api-key.guard';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('Users')
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@UseGuards(ApiKeyGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(): any {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUser(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @Patch(':id')
  update(@Param('id', MongoIdPipe) id: any, @Body() payload: UpdateUserDto) {
    return this.usersService.editUser(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: any) {
    return this.usersService.deleteUser(id);
  }

  /* @Get(':id/files')
  getUserFiles(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFilesByUser(id);
  } */
}
