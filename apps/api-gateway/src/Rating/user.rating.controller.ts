import { RATING_SERVICE } from '@app/common';
import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RoleGuard } from '../Auth/role.guard';

@Controller('rating')
@UseGuards(RoleGuard)
export class RatingController {
  constructor(@Inject(RATING_SERVICE) readonly client: ClientProxy) {}

  @Post()
  async createRating(@Body() rating: any, @Request() req) {
    return await this.client
      .send(
        { cmd: 'createRating' },
        {
          ...rating,
          userId: req.user._id,
        },
      )
      .toPromise();
  }
}
