import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'authors',
  timestamps: true,
})
export class Author {
  @Prop({
    required: true,
  })
  name: string; //name of the author

  @Prop()
  birthDate: Date; //date of birth of the author

  @Prop()
  image: string; //URL of the author's image

  @Prop()
  description: string; //brief summary of the author's life

  @Prop()
  sameAs: string[]; //URL of the author's Wikipedia page

  @Prop()
  nationality: string; //

  @Prop()
  jobTitle: string; //job title of the author

  @Prop()
  awards: string[]; //awards won by the author
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
