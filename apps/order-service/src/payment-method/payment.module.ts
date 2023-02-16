import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentMethod, PaymentMethodSchema } from './payment.schema';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PaymentMethod.name,
        schema: PaymentMethodSchema,
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
