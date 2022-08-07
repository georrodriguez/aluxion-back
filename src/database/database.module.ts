import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, password, database } = configService.mongo;
        return {
          uri: `mongodb+srv://${user}:${password}@cluster0.jzo5pqn.mongodb.net/${database}?retryWrites=true&w=majority`,
        };
      },
      inject: [config.KEY],
    }),
  ],
  /* imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, password, database } = configService.mongo;
        return {
          uri: `mongodb+srv://${user}:${password}@cluster0.jzo5pqn.mongodb.net?retryWrites=true&w=majority`,
          user,
          pass: password,
          database,
        };
      },
    }),
  ], */
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, database, password } = configService.mongo;
        const uri = `mongodb+srv://${user}:${password}@cluster0.jzo5pqn.mongodb.net?retryWrites=true&w=majority`;
        const client = new MongoClient(uri);
        await client.connect();
        const dataBaseConnection = client.db(database);
        return dataBaseConnection;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
