import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';
import { Dog, DogSchema } from './schemas/dog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }])],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
