import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
  ) {}

  async create(order: Order): Promise<Order> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).exec();
  }

  async updateStatus(orderId: string, status: string): Promise<Order> {
    return this.orderModel
      .findOneAndUpdate(
        {
          _id: orderId,
        },
        {
          $set: {
            status,
          },
        },
        {
          new: true,
        },
      )
      .exec();
  }
}
