import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BirdController } from './bird.controller';
import { BirdService } from './bird.service';
import { Bird, BirdSchema } from './schemas/bird.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bird.name, schema: BirdSchema }]),
  ],
  controllers: [BirdController],
  providers: [BirdService],
})
export class BirdModule {}
