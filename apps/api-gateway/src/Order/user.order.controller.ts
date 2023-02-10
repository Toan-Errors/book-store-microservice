import { ORDER_SERVICE } from '@app/common';
import { Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class UserOrderController {
  constructor(@Inject(ORDER_SERVICE) readonly client: ClientProxy) {}

  @Post()
  async createOrder() {
    return await this.client.send({ cmd: 'createOrder' }, {}).toPromise();
  }

  @Post('find-all')
  async findAllOrders() {
    return await this.client.send({ cmd: 'findAllOrders' }, {}).toPromise();
  }

  @Post('find-by-user-id')
  async findOrderByUserId() {
    return await this.client.send({ cmd: 'findOrderByUserId' }, {}).toPromise();
  }

  @Post('update-status')
  async updateOrderStatus() {
    return await this.client.send({ cmd: 'updateOrderStatus' }, {}).toPromise();
  }
}
