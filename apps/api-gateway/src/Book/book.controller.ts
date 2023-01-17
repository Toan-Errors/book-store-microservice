import { CreateBookDto } from '@app/common';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Controller('books')
export class BooksController {
  @Client({ transport: Transport.REDIS })
  client: ClientProxy;

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.client
      .send({ cmd: 'createBook' }, createBookDto)
      .toPromise();
    return book;
  }

  @Get()
  async findAll() {
    const books = await this.client
      .send({ cmd: 'findAllBooks' }, {})
      .toPromise();
    return books;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.client.send({ cmd: 'findOneBook' }, id).toPromise();
    return book;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    const book = await this.client
      .send({ cmd: 'updateBook' }, { id, updateBookDto })
      .toPromise();
    return book;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const book = await this.client.send({ cmd: 'removeBook' }, id).toPromise();
    return book;
  }
}
