import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shipping } from './shipping.schema';

@Injectable()
export class ShippingService {
  constructor(
    @InjectModel('Shipping') private readonly shippingModel: Model<Shipping>,
  ) {}

  //Create
  async create(shipping: Shipping): Promise<Shipping> {
    return await this.shippingModel.create(shipping);
  }

  //find all
  async findAll(): Promise<Shipping[]> {
    return await this.shippingModel.find().exec();
  }

  //find by id
  async findById(id: string): Promise<Shipping> {
    return await this.shippingModel.findById(id).exec();
  }
}
