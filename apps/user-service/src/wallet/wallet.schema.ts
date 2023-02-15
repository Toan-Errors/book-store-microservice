import {
  Prop,
  Schema as SchemaDecorator,
  SchemaFactory,
} from '@nestjs/mongoose';

@SchemaDecorator({
  collection: 'wallets',
  timestamps: true,
})
export class Wallet {
  @Prop({
    required: true,
  })
  userId: string; //id of the user

  @Prop()
  balance: number; //balance of the wallet

  @Prop()
  points: number; //points of the wallet
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
