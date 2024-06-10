import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema()
export class Animal {
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  origin: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
