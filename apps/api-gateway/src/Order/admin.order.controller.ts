import { OrderShippingDto, ORDER_SERVICE } from '@app/common';
import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../Auth/role.decorator';
import { Role } from '../Auth/role.enum';
import { RoleGuard } from '../Auth/role.guard';

@Controller('order')
@UseGuards(RoleGuard)
export class AdminOrderController {
  constructor(@Inject(ORDER_SERVICE) readonly client: ClientProxy) {}

  @Post('create-shipping')
  @Roles(Role.ADMIN)
  async createShipping(@Body() data: OrderShippingDto) {
    return await this.client
      .send({ cmd: 'createShipping' }, { shipping: data })
      .toPromise();
  }

  @Post('create-payment')
  @Roles(Role.ADMIN)
  async createPayment(@Body() data: any) {
    return await this.client
      .send({ cmd: 'createPayment' }, { payment: data })
      .toPromise();
  }

  @Post('orders/:page/:limit/all')
  @Roles(Role.ADMIN)
  async getAllOrders(
    @Body() body: any,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    const { query } = body;
    const orders = await this.client
      .send(
        { cmd: 'getAllOrders' },
        {
          query,
          page,
          limit,
        },
      )
      .toPromise();
    return orders;
  }

  @Put('update-status')
  @Roles(Role.ADMIN)
  async updateOrderStatus(@Body() data: any) {
    return await this.client
      .send({ cmd: 'updateOrderStatus' }, data)
      .toPromise();
  }
}
