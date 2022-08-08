import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Db } from 'mongodb';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ForgotPassword } from '../dtos/forgot-password.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @Inject('MONGO') private database: Db,
  ) {}

  async getAll() {
    const users = await this.UserModel.find().exec();
    return {
      message: 'Users Listed!',
      data: users,
    };
  }

  async getUser(id: string) {
    const user = await this.UserModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    } else {
      return {
        message: 'User Listed!',
        data: user,
      };
    }
  }

  async createUser(payload: CreateUserDto) {
    const newUser = await new this.UserModel(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    newUser.save();
    return {
      message: 'User created!',
      data: newUser,
    };
  }

  async findByEmail(email: string) {
    const userEncontrado = await this.UserModel.findOne({ email }).exec();
    return userEncontrado;
  }

  async editUser(id: string, payload: UpdateUserDto) {
    const user = await this.UserModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    ).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    } else {
      return {
        message: 'User updated!',
        data: user,
      };
    }
  }

  async deleteUser(id: string) {
    const isDeleted = await this.UserModel.findByIdAndDelete(id);
    if (!isDeleted) {
      throw new NotFoundException(`User #${id} not found`);
    } else {
      return { message: `User ${id} deleted!` };
    }
  }

  async forgotPassword(payload: ForgotPassword) {
    const user = this.findByEmail(payload.email);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return {
      message: 'This functions is bulding...',
    };
  }
}
