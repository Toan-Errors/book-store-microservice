import { BOOK_SERVICE } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RoleGuard } from '../../Auth/role.guard';
import { Roles } from '../../Auth/role.decorator';
import { Role } from '../../Auth/role.enum';

@Controller('author')
@UseGuards(RoleGuard)
export class AdminAuthorController {
  constructor(@Inject(BOOK_SERVICE) readonly client: ClientProxy) {}

  @Post('create')
  @Roles(Role.ADMIN)
  async create(@Body() body: any) {
    const authors = await this.client
      .send({ cmd: 'createAuthor' }, body)
      .toPromise();
    return authors;
  }

  @Put('update/:id')
  @Roles(Role.ADMIN)
  async update(@Body() body: any, @Param('id') id: string) {
    const authors = await this.client
      .send({ cmd: 'updateAuthor' }, { id, body })
      .toPromise();
    return authors;
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    const authors = await this.client
      .send({ cmd: 'deleteAuthor' }, { id })
      .toPromise();
    return authors;
  }
}
