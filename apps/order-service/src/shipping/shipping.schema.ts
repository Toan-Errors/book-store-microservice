import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'shippings',
  timestamps: true,
})
export class Shipping {
  @Prop({
    required: true,
  })
  shippingMethod: string; //shipping method

  @Prop({
    required: true,
  })
  shippingCost: number; //shipping cost

  @Prop({
    required: true,
  })
  shippingTime: string; //shipping time
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping);
