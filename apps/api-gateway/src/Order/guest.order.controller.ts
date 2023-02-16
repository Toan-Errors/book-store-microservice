import { ORDER_SERVICE } from '@app/common';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class GuestOrderController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Get('shipping')
  async findAll() {
    return await this.client.send({ cmd: 'findAllShipping' }, {}).toPromise();
  }

  @Get('payment')
  async findAllPayment() {
    return await this.client.send({ cmd: 'findAllPayment' }, {}).toPromise();
  }
}
