import { REDIS_OPTIONS, USER_SERVICE, WISHLIST_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserWishlistController } from './user.wishlist.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: WISHLIST_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
      {
        name: USER_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
  ],
  controllers: [UserWishlistController],
})
export class WishlistModule {}
