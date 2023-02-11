import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'users',
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: 'user',
  })
  role: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    default: '',
  })
  avatar: string;

  @Prop({
    default: [],
  })
  deliveryAddresses: [
    {
      id: string;
      address: string;
      wards: string;
      district: string;
      city: string;
      country: string;
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
