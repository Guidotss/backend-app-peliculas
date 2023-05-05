import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Film, FilmResult } from './interfaces/film.interface';



@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name); 

  constructor(
    private readonly http: AxiosAdapter
  ) {}

  public async findAll(id?:string) {
    try {
      const data = await this.http.get<Film>(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=es-ES&page=1`,
      );
      if(id === 'true'){
        return data.results.map((film:FilmResult) => film.id); 
      }
      return data.results;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async findOne(id: number) {
    try {
      const data = await this.http.get<Film>(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=es-ES`,
      );
      return data;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async findRelatedFilms(id: string) { 
    try { 
      const data = await this.http.get<Film>(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=es-ES&page=1`);
      return data.results;

    }catch(error){ 
      this.handleErrors(error); 
    }
  }

  public async getTrendingFilms() { 
    try{
      
      const trendingDay = await this.http.get<Film>(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}&language=es-ES&page=1`);
      const trendingWeek = await this.http.get<Film>(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}&language=es-ES&page=1`);
      
      return {
        trendingDay: trendingDay.results,
        trendingWeek: trendingWeek.results
      }

    }catch(error){  
      this.handleErrors(error); 
    }
  }


  private handleErrors(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      `An error has ocurred while trying to get the films`
    );
  }
}
