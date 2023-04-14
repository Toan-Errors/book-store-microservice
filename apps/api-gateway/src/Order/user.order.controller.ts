import { AddToOrderDto, ORDER_SERVICE } from '@app/common';
import {
  Body,
  Controller,
  Inject,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
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
  async createOrder(@Body() order: AddToOrderDto, @Request() req) {
    return await this.client
      .send({ cmd: 'createOrder' }, { ...order, userId: req.user._id })
      .toPromise();
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

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  async getOrders(@Request() req) {
    return await this.client
      .send({ cmd: 'findOrderByUserId' }, { userId: req.user._id })
      .toPromise();
  }
}
