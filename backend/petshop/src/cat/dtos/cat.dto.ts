import { AnimalDto } from 'src/animal/dtos/animal.dto';
import { Cat } from '../schemas/cat.schema';

export class CatDto extends AnimalDto {
  temperament: string;
  colors: string[];

  constructor(cat: Cat) {
    super(cat._id, cat.name, cat.origin, cat.description, cat.image);
    this.temperament = cat.temperament;
    this.colors = cat.colors;
  }

  static constructMultiple(cats: Cat[]): CatDto[] {
    return cats.map((cat) => new CatDto(cat));
  }
}
