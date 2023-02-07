import { BOOK_SERVICE } from '@app/common';
import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Controller('books')
export class BooksController {
  constructor(@Inject(BOOK_SERVICE) readonly client: ClientProxy) {}

  @Get()
  async findAll() {
    console.log('findAll');
    const books = await this.client
      .send({ cmd: 'findAllBooks' }, {})
      .toPromise();
    return books;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.client
      .send({ cmd: 'findBookById' }, { id })
      .toPromise();
    return book;
  }
}
