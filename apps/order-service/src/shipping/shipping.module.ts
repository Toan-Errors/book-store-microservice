import { Module } from '@nestjs/common/decorators';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingController } from './shipping.controller';
import { Shipping, ShippingSchema } from './shipping.schema';
import { ShippingService } from './shipping.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shipping.name,
        schema: ShippingSchema,
      },
    ]),
  ],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
