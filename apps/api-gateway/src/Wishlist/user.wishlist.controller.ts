import { WISHLIST_SERVICE } from '@app/common';
import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
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

  @Get()
  @Roles(Role.ADMIN)
  async getWishlist() {
    return await this.client.send({ cmd: 'findAllWishlist' }, {}).toPromise();
  }
}
