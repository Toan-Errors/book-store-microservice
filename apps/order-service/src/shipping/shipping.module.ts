import { Module } from '@nestjs/common/decorators';
import { MongooseModule } from '@nestjs/mongoose';
import { Shipping, ShippingSchema } from './shipping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shipping.name,
        schema: ShippingSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class ShippingModule {}
