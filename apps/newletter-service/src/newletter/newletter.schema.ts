import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'newletters',
  timestamps: true,
})
export class Newletter {
  @Prop({
    required: true,
  })
  bannerImage: string; // banner image of the newletter

  @Prop({
    required: true,
  })
  title: string; // title of the newletter

  @Prop({
    required: true,
  })
  description: string; // description of the newletter

  @Prop({
    required: true,
  })
  content: string; // content of the newletter
}

export const NewletterSchema = SchemaFactory.createForClass(Newletter);
