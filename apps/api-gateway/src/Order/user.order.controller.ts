import { ORDER_SERVICE } from '@app/common';
import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../Auth/role.decorator';
import { Role } from '../Auth/role.enum';
import { RoleGuard } from '../Auth/role.guard';

@Controller('order')
@UseGuards(RoleGuard)
export class UserOrderController {
  constructor(@Inject(ORDER_SERVICE) readonly client: ClientProxy) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  async createOrder() {
    return await this.client.send({ cmd: 'createOrder' }, {}).toPromise();
  }

  @Post('find-all')
  @Roles(Role.ADMIN)
  async findAllOrders() {
    return await this.client.send({ cmd: 'findAllOrders' }, {}).toPromise();
  }

  @Post('find-by-user-id')
  @Roles(Role.USER, Role.ADMIN)
  async findOrderByUserId() {
    return await this.client.send({ cmd: 'findOrderByUserId' }, {}).toPromise();
  }

  @Post('update-status')
  @Roles(Role.USER, Role.ADMIN)
  async updateOrderStatus() {
    return await this.client.send({ cmd: 'updateOrderStatus' }, {}).toPromise();
  }
}
