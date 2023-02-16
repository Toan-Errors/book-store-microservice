import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'payment-methods',
  timestamps: true,
})
export class PaymentMethod {
  @Prop({
    required: true,
  })
  paymentMethod: string; //payment method
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);
