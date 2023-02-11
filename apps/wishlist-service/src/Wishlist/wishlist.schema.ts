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
  })
  bookId: string;

  @Prop({
    default: false,
  })
  isDeleted: boolean;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
