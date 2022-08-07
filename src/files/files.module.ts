import { Module } from '@nestjs/common';
import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files.service';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './entities/file.entity';
import { ConfigModule, ConfigType } from '@nestjs/config';
import config from '../config';

@Module({
  imports: [
    ConfigModule.forFeature(config),
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  controllers: [FilesController],
  providers: [
    FilesService,
    {
      provide: 'CONFIG',
      useFactory: async (configService: ConfigType<typeof config>) => {
        return configService;
      },
      inject: [config.KEY],
    },
  ],
  exports: [FilesService, MongooseModule],
})
export class FilesModule {}
