import { CreateBookDto, ListAllEntitiesDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<ListAllEntitiesDto[]> {
    const books = await this.bookModel.find();
    return books.map((book) => ({
      _id: book._id,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      country: book.country,
      ageGroup: book.ageGroup,
      saleDate: book.saleDate,
      price: book.price,
      publisher: book.publisher,
      genres: book.genres,
      pages: book.pages,
      coverImage: book.coverImage,
      language: book.language,
    }));
  }

  async create(book: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async update(id: string, book: CreateBookDto): Promise<CreateBookDto> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }

  async delete(id: string): Promise<void> {
    return this.bookModel.findByIdAndRemove(id);
  }
}
