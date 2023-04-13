import { BOOK_SERVICE } from '@app/common';
import {
  Controller,
  Get,
  Param,
  Inject,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Controller('books')
export class BooksController {
  constructor(@Inject(BOOK_SERVICE) readonly client: ClientProxy) {}

  @Get()
  async findAll() {
    const books = await this.client
      .send({ cmd: 'findAllBooks' }, {})
      .toPromise();
    return books;
  }

  @Post('pagination/:page/:limit')
  async findBooksByPagination(
    @Body() body: any,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    const books = await this.client
      .send(
        { cmd: 'findBooksByPagination' },
        {
          query: body,
          page,
          limit,
        },
      )
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
