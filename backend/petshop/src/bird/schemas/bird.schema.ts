import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Animal } from '../../animal/schemas/animal.schema';

export type BirdDocument = HydratedDocument<Bird>;

@Schema()
export class Bird extends Animal {
  @Prop()
  species: string;

  @Prop()
  family: string;

  @Prop()
  habitat: string;

  @Prop()
  place_of_found: string;

  @Prop()
  diet: string;

  @Prop()
  wingspan_cm: number;

  @Prop()
  weight_kg: number;
}

export const BirdSchema = SchemaFactory.createForClass(Bird);
