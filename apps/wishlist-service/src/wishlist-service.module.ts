import { MONGODB_URI } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WishlistServiceController } from './wishlist-service.controller';
import { WishlistServiceService } from './wishlist-service.service';
import { WishlistModule } from './Wishlist/wishlist.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), WishlistModule],
  controllers: [WishlistServiceController],
  providers: [WishlistServiceService],
})
export class WishlistServiceModule {}
