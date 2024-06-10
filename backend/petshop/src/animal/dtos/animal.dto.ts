import { Types } from 'mongoose';

export class AnimalDto {
  id: Types.ObjectId;
  name: string;
  origin: string;
  description: string;
  image: string;

  constructor(id, name, origin, description, image) {
    this.id = id;
    this.name = name;
    this.origin = origin;
    this.description = description;
    this.image = image;
  }
}
