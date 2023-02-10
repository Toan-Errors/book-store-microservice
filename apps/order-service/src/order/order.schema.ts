import { AddToOrderDto } from '@app/common/order/add-to-order.dto';
import { AddressDetailDto } from '@app/common/order/address_detail.dto';
import { OrderShippingDto } from '@app/common/order/order-shipping.dto';
import { OrderPaymentDto } from '@app/common/order/order_payment.dto';
import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'inventories',
  timestamps: true,
})
export class Order {
  @Prop({
    required: true,
  })
  userId: string; // the unique identifier of the user associated with the order

  @Prop({
    required: true,
  })
  books: AddToOrderDto[]; // the unique identifier of the book associated with the order

  @Prop({
    required: true,
  })
  total: number; // total price of the order

  @Prop({
    required: true,
    enum: ['pending', 'shipping', 'completed', 'canceled'],
  })
  status: string; // status of the order

  @Prop({
    required: true,
  })
  address_detail: AddressDetailDto; // address of the user associated with the order

  @Prop({
    required: true,
  })
  payment: OrderPaymentDto; // payment of the user associated with the order

  @Prop({
    required: true,
  })
  shipping: OrderShippingDto; // shipping of the user associated with the order
}

export const OrderSchema = SchemaFactory.createForClass(Order);
