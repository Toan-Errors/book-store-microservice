import { Module } from '@nestjs/common';
import { BooksController } from './book.controller';

@Module({
  controllers: [BooksController],
})
export class BooksModule {}
