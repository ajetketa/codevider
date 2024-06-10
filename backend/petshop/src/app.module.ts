import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';
import { BirdModule } from './bird/bird.module';

const dotenv = require('dotenv');
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING, {
      dbName: 'animals',
      authSource: 'admin'
    }),
    CatModule,
    DogModule,
    BirdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
