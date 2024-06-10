import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Animal } from '../../animal/schemas/animal.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat extends Animal {
  @Prop()
  temperament: string;

  @Prop([String])
  colors: string[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);
