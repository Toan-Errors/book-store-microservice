import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookServiceController } from './book-service.controller';
import { BookServiceService } from './book-service.service';
import { BooksModule } from './book/book.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://toanerror:5sonline@cluster1.vquj40v.mongodb.net/bookstore',
    ),
    BooksModule,
  ],
  controllers: [BookServiceController],
  providers: [BookServiceService],
})
export class BookServiceModule {}
