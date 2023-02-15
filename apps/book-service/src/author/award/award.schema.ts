import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'awards',
  timestamps: true,
})
export class Award {
  @Prop({
    required: true,
  })
  name: string; //name of the award

  @Prop()
  startDate: Date; //date the award was first given

  @Prop()
  location: string; //location where the award is given
}

export const AwardSchema = SchemaFactory.createForClass(Award);
