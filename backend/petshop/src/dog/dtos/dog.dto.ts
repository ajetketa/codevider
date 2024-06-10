import { AnimalDto } from 'src/animal/dtos/animal.dto';
import { Dog } from '../schemas/dog.schema';

export class DogDto extends AnimalDto {
  temperament: string;
  colors: string[];
  breedGroup: string;
  size: string;
  lifespan: string;

  constructor(dog: Dog) {
    super(dog._id, dog.name, dog.origin, dog.description, dog.image);
    this.temperament = dog.temperament;
    this.colors = dog.colors;
    this.breedGroup = dog.breed_group;
    this.size = dog.size;
    this.lifespan = dog.lifespan;
  }

  static constructMultiple(dogs: Dog[]): DogDto[] {
    console.log(dogs[0]);
    console.log(dogs[0].size);
    return dogs.map((dog) => new DogDto(dog));
  }

  static dtoToSchema(dogDto: DogDto): Dog {
    const dog: Dog = new Dog();
    dog.name = dogDto.name;
    dog.origin = dogDto.origin;
    dog.description = dogDto.description;
    dog.image = dogDto.image;
    dog.temperament = dogDto.temperament;
    dog.colors = dogDto.colors;
    dog.breed_group = dogDto.breedGroup;
    dog.size = dogDto.size;
    dog.lifespan = dogDto.lifespan;
    return dog;
  }
}
