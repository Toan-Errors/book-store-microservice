import { BOOK_SERVICE } from '@app/common';
import { Controller, Inject, Get, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('genres')
export class GenresController {
  constructor(@Inject(BOOK_SERVICE) readonly client: ClientProxy) {}

  @Get()
  async findAll() {
    const authors = await this.client
      .send({ cmd: 'findAllGenres' }, {})
      .toPromise();
    return authors;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const author = await this.client
      .send({ cmd: 'findGenreById' }, { id })
      .toPromise();
    return author;
  }
}
