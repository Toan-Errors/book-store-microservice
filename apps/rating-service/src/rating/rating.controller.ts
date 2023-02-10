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
}
