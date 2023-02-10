import { AddToCartDto, CART_SERVICE } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from '../Auth/role.decorator';
import { Role } from '../Auth/role.enum';
import { RoleGuard } from '../Auth/role.guard';

@Controller('cart')
@UseGuards(RoleGuard)
export class UserCartController {
  constructor(@Inject(CART_SERVICE) readonly client: ClientProxy) {}

  @Post()
  @Roles(Role.USER, Role.ADMIN)
  async addToCart(@Body() cart: AddToCartDto, @Request() req) {
    return await this.client
      .send({ cmd: 'addToCart' }, { ...cart, userId: req.user._id })
      .toPromise();
  }

  @Get()
  @Roles(Role.USER, Role.ADMIN)
  async getCart(@Request() req) {
    return await this.client
      .send({ cmd: 'getCart' }, { userId: req.user._id })
      .toPromise();
  }
}
