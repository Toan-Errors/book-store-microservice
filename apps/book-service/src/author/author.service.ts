import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './author.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  // Retrieve all authors
  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().exec();
  }

  // Retrieve author by id
  async findById(id: string): Promise<Author> {
    return await this.authorModel.findById(id).exec();
  }

  // Create author
  async create(author: Author): Promise<Author> {
    return await this.authorModel.create(author);
  }

  // Update author
  async update(id: string, author: any): Promise<Author> {
    return await this.authorModel.findByIdAndUpdate(id, author, { new: true });
  }

  // Delete author
  async delete(id: string): Promise<Author> {
    return await this.authorModel.findByIdAndRemove(id);
  }
}
