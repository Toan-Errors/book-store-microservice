import { BOOK_SERVICE, CreateBookDto } from '@app/common';
import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../Auth/role.decorator';
import { Role } from '../Auth/role.enum';
import { RoleGuard } from '../Auth/role.guard';

@Controller('books')
@UseGuards(RoleGuard)
export class AdminBooksController {
  constructor(@Inject(BOOK_SERVICE) readonly client: ClientProxy) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.client
      .send({ cmd: 'createBook' }, createBookDto)
      .toPromise();
    return book;
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
    const book = await this.client
      .send({ cmd: 'updateBook' }, { id, updateBookDto })
      .toPromise();
    return book;
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    const book = await this.client.send({ cmd: 'removeBook' }, id).toPromise();
    return book;
  }
}
