import { BOOK_SERVICE, REDIS_OPTIONS } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  ],
  controllers: [BooksController],
})
export class BooksModule {}
