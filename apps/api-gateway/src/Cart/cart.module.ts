import { CART_SERVICE, REDIS_OPTIONS, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common/decorators';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserCartController } from './user.cart.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CART_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
  ],
  controllers: [UserCartController],
})
export class CartModule {}
