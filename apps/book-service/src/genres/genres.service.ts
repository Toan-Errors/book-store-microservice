import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './genres.schema';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {}

  //Create
  async create(genre: Genre): Promise<Genre> {
    return await this.genreModel.create(genre);
  }

  //find all
  async findAll(): Promise<Genre[]> {
    return await this.genreModel.find().exec();
  }

  //find by id
  async findById(id: string): Promise<Genre> {
    return await this.genreModel.findById(id).exec();
  }
}
