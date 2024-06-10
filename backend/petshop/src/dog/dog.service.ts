import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, CastError } from 'mongoose';
import { DogDto } from './dtos/dog.dto';
import { Dog } from './schemas/dog.schema';
import { errorWrapper } from 'src/helper/error.helper';

@Injectable()
export class DogService {
  constructor(@InjectModel(Dog.name) private readonly dogModel: Model<Dog>) {}

  async create(createDogDto: DogDto): Promise<Dog> {
    const createdDog = await this.dogModel.create(
      DogDto.dtoToSchema(createDogDto),
    );
    return createdDog;
  }

  async updateOneDog(updateDogDto: DogDto) {
    const updatedDog = await this.dogModel
      .findByIdAndUpdate(
        { _id: updateDogDto.id },
        DogDto.dtoToSchema(updateDogDto),
      )
      .exec();
    return updatedDog;
  }

  async findAllDogs(): Promise<DogDto[]> {
    const dogs: Dog[] = await this.dogModel.find().exec();

    if (dogs.length == 0) return [];

    const dogDtos: DogDto[] = DogDto.constructMultiple(dogs);
    return dogDtos;
  }

  async findOneDog(id: string): Promise<DogDto> {
    try {
      return new DogDto(await this.dogModel.findOne({ _id: id }).exec());
    } catch (CastError) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }
  }

  async findByBreedName(breedName: string): Promise<DogDto[]> {
    const regex: RegExp = new RegExp(".*" + breedName + ".*", 'i');
    const dogs: Dog[] = await this.dogModel.find({ name: { $regex: regex }}).exec();
    
    if (dogs.length == 0) return [];

    const dogDtos: DogDto[] = DogDto.constructMultiple(dogs);
    return dogDtos;
  }

  async deleteOneDog(id: string) {
    const deletedDog = await this.dogModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedDog;
  }
}
