import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  Query,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { DogDto } from './dtos/dog.dto';
import { Dog } from './schemas/dog.schema';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { errorWrapper } from 'src/helper/error.helper';

@Controller('dogs')
@UseFilters(HttpExceptionFilter)
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post()
  async create(@Body() createDogDto: DogDto) {
    await this.dogService.create(createDogDto);
  }

  @Get()
  async findAll(@Query('name') breedName: string): Promise<DogDto[]> {
    if (breedName) return errorWrapper(async () => await this.dogService.findByBreedName(breedName));
    return errorWrapper(async () => await this.dogService.findAllDogs());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DogDto> {
    return errorWrapper(async () => await this.dogService.findOneDog(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDogDto: DogDto) {
    return this.dogService.updateOneDog(updateDogDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.dogService.deleteOneDog(id);
  }
}
