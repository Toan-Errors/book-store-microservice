import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'wishlists',
  timestamps: true,
})
export class Wishlist {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
    ref: 'Book',
  })
  bookId: string;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
