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
import { BirdService } from './bird.service';
import { BirdDto } from './dtos/bird.dto';
import { Bird } from './schemas/bird.schema';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { errorWrapper } from 'src/helper/error.helper';

@Controller('birds')
@UseFilters(HttpExceptionFilter)
export class BirdController {
  constructor(private readonly birdService: BirdService) {}

  @Post()
  async create(@Body() createBirdDto: BirdDto) {
    await this.birdService.create(createBirdDto);
  }

  @Get()
  async findAll(@Query('name') breedName: string): Promise<BirdDto[]> {
    if (breedName) return errorWrapper(async () => await this.birdService.findByBreedName(breedName));
    return errorWrapper(async () => await this.birdService.findAllBirds());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BirdDto> {
    return errorWrapper(async () => await this.birdService.findOneBird(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBirdDto: BirdDto) {
    return this.birdService.updateOneBird(updateBirdDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.birdService.deleteOneBird(id);
  }
}
