import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}
  private readonly logger = new Logger(GenresController.name);

  @MessagePattern({ cmd: 'findAllGenres' })
  async findAllGenres() {
    this.logger.log(`Received find all genres command`);
    return this.genresService.findAll();
  }

  @MessagePattern({ cmd: 'findGenreById' })
  async findGenreById(data: { id: string }) {
    this.logger.log(`Received find genre by id command for ${data.id}`);
    return this.genresService.findById(data.id);
  }

  @MessagePattern({ cmd: 'createGenre' })
  async createGenre(data: { genre: string }) {
    this.logger.log(`Received create genre command for ${data.genre}`);
    return this.genresService.create(data as any);
  }
}
