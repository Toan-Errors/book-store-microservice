import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { Cart } from './cart.schema';
import { Controller, Injectable, Logger } from '@nestjs/common';

@Injectable()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  private readonly logger = new Logger(CartController.name);

  @MessagePattern({ cmd: 'findAllCarts' })
  async findAllCarts() {
    return this.cartService.findAll();
  }

  @MessagePattern({ cmd: 'findCartById' })
  async findCartById(id: string) {
    return this.cartService.findByUserId(id);
  }

  @MessagePattern({ cmd: 'addToCart' })
  async createCart(cart: Cart) {
    this.logger.log(`Creating a new cart: ${JSON.stringify(cart)}`);
    return this.cartService.create(cart);
  }

  @MessagePattern({ cmd: 'getCart' })
  async getCart(data: { userId: string }) {
    this.logger.log(`Getting cart for user: ${data.userId}`);
    return this.cartService.findByUserId(data.userId);
  }

  @MessagePattern({ cmd: 'updateCart' })
  async updateCart(id: string, cart: Cart) {
    this.logger.log(
      `Updating cart with id: ${id}. New data: ${JSON.stringify(cart)}`,
    );
    return this.cartService.updateQuantity(id, cart.quantity);
  }

  @MessagePattern({ cmd: 'deleteCart' })
  async deleteCart(id: string) {
    this.logger.log(`Deleting cart with id: ${id}`);
    return this.cartService.delete(id);
  }

  @MessagePattern({ cmd: 'changeQuantity' })
  async changeQuantity(data: { cartId: string; type: string }) {
    this.logger.log(
      `Changing quantity for cart with id: ${data.cartId}. Type: ${data.type}`,
    );
    return this.cartService.changeQuantity(data.cartId, data.type);
  }

  @MessagePattern({ cmd: 'deleteCarts' })
  async deleteCarts(ids: string[]) {
    this.logger.log(`Deleting carts with ids: ${ids}`);
    return this.cartService.deletes(ids);
  }
}
