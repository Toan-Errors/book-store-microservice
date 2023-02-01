import { BOOK_SERVICE, REDIS_OPTIONS, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminBooksController } from './admin.book.controller';
import { BooksController } from './book.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BOOK_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
  ],
  controllers: [BooksController, AdminBooksController],
})
export class BooksModule {}
