import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'genres',
  timestamps: true,
})
export class Genre {
  @Prop({
    required: true,
  })
  name: string; //name of the genre

  @Prop()
  description: string; //description of the genre
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
