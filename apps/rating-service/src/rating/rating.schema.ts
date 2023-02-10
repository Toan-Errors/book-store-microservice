import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'ratings',
  timestamps: true,
})
export class Rating {
  @Prop({
    required: true,
  })
  userId: string; // the unique identifier of the user associated with the rating

  @Prop({
    required: true,
  })
  bookId: string; // the unique identifier of the book associated with the rating

  @Prop({
    required: true,
  })
  rating: number; // rating of the book associated with the rating

  @Prop({
    required: true,
  })
  comment: string; // comment of the book associated with the rating

  @Prop({
    required: true,
  })
  name: string; // name of the user associated with the rating
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
