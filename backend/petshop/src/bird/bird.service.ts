import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, CastError } from 'mongoose';
import { BirdDto } from './dtos/bird.dto';
import { Bird } from './schemas/bird.schema';
import { errorWrapper } from 'src/helper/error.helper';

@Injectable()
export class BirdService {
  constructor(
    @InjectModel(Bird.name) private readonly birdModel: Model<Bird>,
  ) {}

  async create(createBirdDto: BirdDto): Promise<Bird> {
    const createdBird = await this.birdModel.create(
      BirdDto.dtoToSchema(createBirdDto),
    );
    return createdBird;
  }

  async updateOneBird(updateBirdDto: BirdDto) {
    const updatedBird = await this.birdModel.findByIdAndUpdate(
      { _id: updateBirdDto.id },
      BirdDto.dtoToSchema(updateBirdDto),
    ).exec();
    return updatedBird;
  }

  async findAllBirds(): Promise<BirdDto[]> {
    const birds: Bird[] = await this.birdModel.find().exec();

    if (!birds) {
      throw new NotFoundException('Birds not found');
    }

    const BirdDtos: BirdDto[] = BirdDto.constructMultiple(birds);
    return BirdDtos;
  }

  async findByBreedName(breedName: string): Promise<BirdDto[]> {
    const regex: RegExp = new RegExp(".*" + breedName + ".*", 'i');
    const birds: Bird[] = await this.birdModel.find({ name: { $regex: regex }}).exec();
    
    if (birds.length == 0) return [];

    const birdDtos: BirdDto[] = BirdDto.constructMultiple(birds);
    return birdDtos;
  }

  async findOneBird(id: string): Promise<BirdDto> {
    try {
      return new BirdDto(await this.birdModel.findOne({ _id: id }).exec());
    } catch (CastError) {
      throw new NotFoundException(`Bird with id ${id} not found`);
    }
  }

  async deleteOneBird(id: string) {
    const deletedBird = await this.birdModel.findByIdAndDelete({
      _id: id,
    }).exec();
    return deletedBird;
  }
}
