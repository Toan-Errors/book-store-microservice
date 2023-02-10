import { MONGODB_URI } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartServiceController } from './cart-service.controller';
import { CartServiceService } from './cart-service.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), CartModule],
  controllers: [CartServiceController],
  providers: [CartServiceService],
})
export class CartServiceModule {}
