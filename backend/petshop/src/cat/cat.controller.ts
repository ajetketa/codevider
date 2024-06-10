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
import { CatService } from './cat.service';
import { CatDto } from './dtos/cat.dto';
import { Cat } from './schemas/cat.schema';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { errorWrapper } from 'src/helper/error.helper';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatController {
  constructor(private readonly catsService: CatService) {}

  @Post()
  async create(@Body() createCatDto: CatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Query('name') breedName: string): Promise<CatDto[]> {
    if (breedName) return errorWrapper(async () => await this.catsService.findByBreedName(breedName));
    return errorWrapper(async () => await this.catsService.findAllCats());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CatDto> {
    return errorWrapper(async () => await this.catsService.findOneCat(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: CatDto) {
    return this.catsService.updateOneCat(updateCatDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.deleteOneCat(id);
  }
}
