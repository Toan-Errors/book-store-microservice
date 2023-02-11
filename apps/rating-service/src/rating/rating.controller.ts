import { Controller, Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RatingService } from './rating.service';

@Injectable()
@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  private readonly logger = new Logger(RatingController.name);

  @MessagePattern({ cmd: 'createRating' })
  async createRating(rating: any) {
    const { userId, bookId } = rating;
    if (!userId || !bookId) throw new Error('Invalid data');
    const existingRating = await this.ratingService.findByUserIdAndBookId(
      userId,
      bookId,
    );

    if (existingRating) {
      return {
        message: 'Rating already exists',
      };
    }

    this.logger.log(`Creating a new rating: ${JSON.stringify(rating)}`);
    return this.ratingService.create(rating);
  }

  @MessagePattern({ cmd: 'findRatingsByUserId' })
  async findRatingsByUserId(userId: string) {
    this.logger.log(`Getting ratings for user: ${userId}`);
    return this.ratingService.findByUserId(userId);
  }

  @MessagePattern({ cmd: 'findRatingsByBookId' })
  async findRatingsByBookId(bookId: string) {
    this.logger.log(`Getting ratings for book: ${bookId}`);
    return this.ratingService.findByBookId(bookId);
  }

  @MessagePattern({ cmd: '*' })
  async default(data: any) {
    this.logger.log(`Default message: ${JSON.stringify(data)}`);
    return { message: 'Default message' };
  }
}
