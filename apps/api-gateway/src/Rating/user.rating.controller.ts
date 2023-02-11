import { RATING_SERVICE } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../Auth/role.decorator';
import { Role } from '../Auth/role.enum';
import { RoleGuard } from '../Auth/role.guard';

@Controller('rating')
@UseGuards(RoleGuard)
export class RatingController {
  constructor(@Inject(RATING_SERVICE) readonly client: ClientProxy) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
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

  @Get('user')
  @Roles(Role.ADMIN, Role.USER)
  async findByUserIdRating(@Request() req) {
    return await this.client
      .send({ cmd: 'findRatingsByUserId' }, req.user._id)
      .toPromise();
  }
}
