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
    return books.map((book: any) => ({
      _id: book._id,
      title: book.title,
      subtitle: book.subtitle,
      description: book.description,
      author: book.author,
      country: book.country,
      ageGroup: book.ageGroup,
      saleDate: book.saleDate,
      price: book.price,
      price_sale: book.price_sale,
      publisher: book.publisher,
      genres: book.genres,
      pages: book.pages,
      coverImage: book.coverImage,
      images: book.images,
      language: book.language,
      createdAt: book.createdAt,
    }));
  }

  async create(book: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async update(id: string, book: CreateBookDto): Promise<CreateBookDto> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }

  async delete(id: string): Promise<any> {
    return this.bookModel.findByIdAndRemove(id);
  }
}
