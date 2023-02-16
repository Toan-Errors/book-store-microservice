import { MONGODB_URI } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment-method/payment.module';
import { ShippingModule } from './shipping/shipping.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    OrderModule,
    ShippingModule,
    PaymentModule,
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
