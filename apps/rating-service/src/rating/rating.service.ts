import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './rating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private ratingModel: Model<Rating>,
  ) {}

  async create(rating: Rating): Promise<Rating> {
    const createdRating = new this.ratingModel(rating);
    return createdRating.save();
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingModel.find().exec();
  }

  async findByUserId(userId: string): Promise<Rating[]> {
    return this.ratingModel.find({ userId }).exec();
  }

  async findByBookId(bookId: string): Promise<Rating[]> {
    return this.ratingModel.find({ bookId }).exec();
  }
}
