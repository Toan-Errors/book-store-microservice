import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GenresService } from './genres.service';
import { Genre } from './genres.schema';

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
  async createGenre(data: Genre) {
    this.logger.log(`Received create genre command for ${data.name}`);
    return this.genresService.create(data);
  }

  @MessagePattern({ cmd: 'updateGenre' })
  async updateGenre(data: { id: string; body: Genre }) {
    this.logger.log(`Received update genre command for ${data.id}`);
    return this.genresService.update(data.id, data.body);
  }

  @MessagePattern({ cmd: 'deleteGenre' })
  async deleteGenre(data: { id: string }) {
    this.logger.log(`Received delete genre command for ${data.id}`);
    return this.genresService.delete(data.id);
  }
}
