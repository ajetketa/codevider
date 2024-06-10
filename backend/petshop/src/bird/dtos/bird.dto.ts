import { AnimalDto } from 'src/animal/dtos/animal.dto';
import { Bird } from '../schemas/bird.schema';

export class BirdDto extends AnimalDto {
  species: string;
  family: string;
  habitat: string;
  diet: string;
  wingspanCm: number;
  weightKg: number;

  constructor(bird: Bird) {
    super(
      bird._id,
      bird.name,
      bird.place_of_found,
      bird.description,
      bird.image,
    );
    this.species = bird.species;
    this.family = bird.family;
    this.habitat = bird.habitat;
    this.wingspanCm = bird.wingspan_cm;
    this.weightKg = bird.weight_kg;
    this.diet = bird.diet;
  }

  static constructMultiple(birds: Bird[]): BirdDto[] {
    return birds.map((bird) => new BirdDto(bird));
  }

  static dtoToSchema(birdDto: BirdDto): Bird {
    const bird: Bird = new Bird();
    bird.name = birdDto.name;
    bird.place_of_found = birdDto.origin;
    bird.description = birdDto.description;
    bird.image = birdDto.image;
    bird.species = birdDto.species;
    bird.family = birdDto.family;
    bird.habitat = birdDto.habitat;
    bird.wingspan_cm = birdDto.wingspanCm;
    bird.weight_kg = birdDto.weightKg;
    bird.diet = birdDto.diet;
    return bird;
  }
}
