import { ORDER_SERVICE, REDIS_OPTIONS, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminOrderController } from './admin.order.controller';
import { GuestOrderController } from './guest.order.controller';
import { UserOrderController } from './user.order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
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
  controllers: [
    UserOrderController,
    AdminOrderController,
    GuestOrderController,
  ],
})
export class OrderModule {}
