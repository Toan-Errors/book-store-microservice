import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'books',
  timestamps: true,
})
export class Book {
  @Prop({
    required: true,
    unique: true,
  })
  isbn: string; //unique identifier of the book

  @Prop({
    required: true,
  })
  title: string; //title of the book

  @Prop()
  subtitle: string; //subtitle of the book

  @Prop({
    required: true,
  })
  author: string; //author of the book

  @Prop()
  country: string; //country where the book was written

  @Prop()
  ageGroup: string; //age group the book is intended for

  @Prop()
  saleDate: Date; //date on which the book went on sale

  @Prop({
    required: true,
  })
  price: number; //price of the book

  @Prop()
  price_sale: number; //price of the book

  @Prop()
  publisher: string; //publisher of the book

  @Prop()
  genres: [string]; //genres that the book belongs to

  @Prop()
  pages: number; //number of pages in the book

  @Prop()
  coverImage: string; //URL of the book's cover image

  @Prop()
  description: string; //brief summary of the book's plot or content

  @Prop()
  language: string; //language in which the book is written
}

export const BookSchema = SchemaFactory.createForClass(Book);
