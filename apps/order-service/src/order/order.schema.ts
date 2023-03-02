import { AddressDetailDto, OrderShippingDto } from '@app/common';
import { AddToOrderDto } from '@app/common/order/add-to-order.dto';
import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'orders',
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
  items: AddToOrderDto[]; // the unique identifier of the book associated with the order

  @Prop({
    required: true,
  })
  subtotal: number; // subtotal price of the order

  @Prop({
    required: true,
  })
  total: number; // total price of the order

  @Prop({
    required: true,
  })
  delivery_address: AddressDetailDto; // address of the user associated with the order

  @Prop({
    enum: ['pending', 'shipping', 'completed', 'canceled'],
    default: 'pending',
  })
  status: string; // status of the order

  @Prop({
    required: true,
  })
  payment: string; // payment of the user associated with the order

  @Prop({
    required: true,
  })
  shipping: OrderShippingDto; // shipping of the user associated with the order
}

export const OrderSchema = SchemaFactory.createForClass(Order);
