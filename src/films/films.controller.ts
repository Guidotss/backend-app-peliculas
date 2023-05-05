import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll( @Query('id') id:string ) {
    return this.filmsService.findAll(id); 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @Get(':id/related')
  findRelatedFilms(@Param('id') id: string) {
    return this.filmsService.findRelatedFilms(id);
  }

  @Get('trending/movies')
  getTrending() {
    return this.filmsService.getTrendingFilms();
  }
}
