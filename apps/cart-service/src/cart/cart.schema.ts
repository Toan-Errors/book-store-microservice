import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'carts',
  timestamps: true,
})
export class Cart {
  @Prop({
    required: true,
  })
  userId: string; // the unique identifier of the user associated with the cart

  @Prop({
    required: true,
  })
  bookId: string; // the unique identifier of the book associated with the cart

  @Prop({
    required: true,
  })
  title: string; // title of the book associated with the cart

  @Prop({
    required: true,
  })
  author: string; // author of the book associated with the cart

  @Prop({
    required: true,
  })
  coverImage: string; // cover image of the book associated with the cart

  @Prop({
    required: true,
  })
  price: number; // price of the book associated with the cart

  @Prop({
    required: true,
  })
  price_sale: number; // price sale of the book associated with the cart

  @Prop({
    required: true,
  })
  quantity: number; // number of books of the same title in the cart
}

export const CartSchema = SchemaFactory.createForClass(Cart);
