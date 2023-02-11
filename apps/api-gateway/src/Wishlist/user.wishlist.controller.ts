import { WISHLIST_SERVICE } from '@app/common';
import {
  Controller,
  Get,
  Inject,
  UseGuards,
  Post,
  Body,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../Auth/role.decorator';
import { Role } from '../Auth/role.enum';
import { RoleGuard } from '../Auth/role.guard';

@Controller('wishlist')
@UseGuards(RoleGuard)
export class UserWishlistController {
  constructor(
    @Inject(WISHLIST_SERVICE)
    readonly client: ClientProxy,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  async createWishlist(@Body() book: any, @Request() req: any) {
    const userId = req.user._id;
    const bookId = book.bookId;
    return await this.client
      .send({ cmd: 'createWishlist' }, { bookId, userId })
      .toPromise();
  }

  @Get('user')
  @Roles(Role.ADMIN, Role.USER)
  async findByUserIdWishlist(@Request() req: any) {
    const userId = req.user._id;
    return await this.client
      .send({ cmd: 'findByUserIdWishlist' }, userId)
      .toPromise();
  }
}
