import { CreateBookDto } from '@app/common';
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

  async findAll(): Promise<CreateBookDto[]> {
    return this.bookModel.find();
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
