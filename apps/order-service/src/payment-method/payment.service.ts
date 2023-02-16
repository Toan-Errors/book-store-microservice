import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentMethod } from './payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PaymentMethod.name) private paymentModel: Model<PaymentMethod>,
  ) {}

  //Create
  async create(payment: PaymentMethod): Promise<PaymentMethod> {
    return await this.paymentModel.create(payment);
  }

  //find all
  async findAll(): Promise<PaymentMethod[]> {
    return await this.paymentModel.find().exec();
  }
}
