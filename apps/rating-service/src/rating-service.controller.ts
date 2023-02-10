import { Controller, Get } from '@nestjs/common';
import { RatingServiceService } from './rating-service.service';

@Controller()
export class RatingServiceController {
  constructor(private readonly ratingServiceService: RatingServiceService) {}

  @Get()
  getHello(): string {
    return this.ratingServiceService.getHello();
  }
}
