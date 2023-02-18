import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<Cart>,
  ) {}

  async create(cart: Cart): Promise<Cart> {
    const existingCart = await this.cartModel.findOne({
      userId: cart.userId,
      bookId: cart.bookId,
    });
    if (existingCart) {
      existingCart.quantity += cart.quantity;
      return existingCart.save();
    } else {
      const createdCart = new this.cartModel(cart);
      return createdCart.save();
    }
  }

  async findAll(): Promise<Cart[]> {
    return this.cartModel.find().exec();
  }

  async findByUserId(userId: string): Promise<Cart[]> {
    return this.cartModel.find({ userId }).exec();
  }

  async updateQuantity(cartId: string, quantity: number): Promise<Cart> {
    return this.cartModel
      .findByIdAndUpdate(cartId, { quantity }, { new: true })
      .exec();
  }

  async delete(cartId: string): Promise<Cart> {
    return this.cartModel.findByIdAndDelete(cartId).exec();
  }

  async deletes(data: any): Promise<any> {
    const { ids } = data;
    return this.cartModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async changeQuantity(cartId: string, type: string): Promise<Cart> {
    if (type === 'increase') {
      return this.cartModel
        .findByIdAndUpdate(cartId, { $inc: { quantity: 1 } }, { new: true })
        .exec();
    } else {
      return this.cartModel
        .findByIdAndUpdate(cartId, { $inc: { quantity: -1 } }, { new: true })
        .exec();
    }
  }
}
