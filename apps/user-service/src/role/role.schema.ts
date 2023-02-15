import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'roles',
  timestamps: true,
})
export class Role {
  @Prop({
    required: true,
  })
  name: string; //name of the role

  @Prop()
  description: string; //description of the role

  @Prop()
  permissions: string[]; //permissions of the role
}

export const RoleSchema = SchemaFactory.createForClass(Role);
