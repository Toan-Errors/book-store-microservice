import { MONGODB_URI } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookServiceController } from './book-service.controller';
import { BookServiceService } from './book-service.service';
import { BooksModule } from './book/book.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), BooksModule, GenresModule],
  controllers: [BookServiceController],
  providers: [BookServiceService],
})
export class BookServiceModule {}
