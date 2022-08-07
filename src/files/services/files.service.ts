import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { S3 } from 'aws-sdk';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

import { File } from '../entities/file.entity';
import { CreateFileDto, UpdateFileDto } from '../dtos/files.dto';

@Injectable()
export class FilesService {
  constructor(
    @Inject('CONFIG') private configService: ConfigType<typeof config>,
    @InjectModel(File.name) private FileModel: Model<File>,
  ) {}

  async getAll() {
    const Files = await this.FileModel.find().exec();
    return {
      message: 'Files Listed!',
      data: Files,
    };
  }

  async getFile(id: string) {
    const File = await this.FileModel.findById(id).exec();
    if (!File) {
      throw new NotFoundException(`File #${id} not found`);
    } else {
      return {
        message: 'File Listed!',
        data: File,
      };
    }
  }

  async createFile(payload: CreateFileDto) {
    const newFile = await new this.FileModel(payload);
    newFile.save();
    return {
      message: 'File created!',
      data: newFile,
    };
  }

  async storeFile(payload: any) {
    const newFile = await new this.FileModel(payload);
    newFile.save();
    return {
      message: 'File created!',
      data: newFile,
    };
  }

  async editFile(id: string, payload: UpdateFileDto) {
    const File = await this.FileModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    ).exec();
    if (!File) {
      throw new NotFoundException(`File #${id} not found`);
    } else {
      return {
        message: 'File updated!',
        data: File,
      };
    }
  }

  async deleteFile(id: string) {
    const isDeleted = await this.FileModel.findByIdAndDelete(id);
    if (!isDeleted) {
      throw new NotFoundException(`File #${id} not found`);
    } else {
      return { message: `File ${id} deleted!` };
    }
  }

  /* async downloadFile(url: string) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.getObject(params, async (err, data) => {
        if (err) {
          reject(err.message);
        }
        const url = await this.generatePresignedUrl(data.key);
        const newFile = { name: data.key, url: url };
        resolve(newFile);
        return newFile;
      });
    });
  } */

  async upload(file) {
    const { originalname } = file;
    const uploadedFile = await this.uploadS3(
      file.buffer,
      this.configService.AWS.bucket,
      originalname,
    );
    return this.storeFile(uploadedFile);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, async (err, data) => {
        if (err) {
          reject(err.message);
        }
        const url = await this.generatePresignedUrl(data.key);
        const newFile = { name: data.key, url: url };
        resolve(newFile);
        return newFile;
      });
    });
  }

  public async generatePresignedUrl(key: string) {
    const s3 = this.getS3();

    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.AWS.bucket,
      Key: key,
      Expires: 60,
    });
  }

  getS3() {
    return new S3({
      accessKeyId: this.configService.AWS.key,
      secretAccessKey: this.configService.AWS.secret,
    });
  }
}
