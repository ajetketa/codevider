import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, CastError } from 'mongoose';
import { CatDto } from './dtos/cat.dto';
import { Cat } from './schemas/cat.schema';
import { errorWrapper } from 'src/helper/error.helper';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async updateOneCat(updateCatDto: CatDto) {
    const updatedCat = await this.catModel
      .findByIdAndUpdate({ _id: updateCatDto.id }, updateCatDto)
      .exec();
    return updatedCat;
  }

  async findAllCats(): Promise<CatDto[]> {
    const cats: Cat[] = await this.catModel.find().exec();

    if (!cats) return [];

    const catDtos: CatDto[] = CatDto.constructMultiple(cats);
    return catDtos;
  }

  async findByBreedName(breedName: string): Promise<CatDto[]> {
    const regex: RegExp = new RegExp(".*" + breedName + ".*", 'i');
    const cats: Cat[] = await this.catModel.find({ name: { $regex: regex }}).exec();
    
    if (cats.length == 0) return [];

    const catDtos: CatDto[] = CatDto.constructMultiple(cats);
    return catDtos;
  }

  async findOneCat(id: string): Promise<CatDto> {
    try {
      return new CatDto(await this.catModel.findOne({ _id: id }).exec());
    } catch (CastError) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
  }

  async deleteOneCat(id: string) {
    const deletedCat = await this.catModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedCat;
  }
}
