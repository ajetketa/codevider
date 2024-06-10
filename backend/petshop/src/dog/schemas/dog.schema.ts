import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Animal } from '../../animal/schemas/animal.schema';

export type DogDocument = HydratedDocument<Dog>;

@Schema()
export class Dog extends Animal {
  @Prop({})
  breed_group: string;

  @Prop()
  size: string;

  @Prop()
  lifespan: string;

  @Prop()
  temperament: string;

  @Prop()
  colors: string[];
}

export const DogSchema = SchemaFactory.createForClass(Dog);
