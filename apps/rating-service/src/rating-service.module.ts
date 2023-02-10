import { MONGODB_URI } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingServiceController } from './rating-service.controller';
import { RatingServiceService } from './rating-service.service';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), RatingModule],
  controllers: [RatingServiceController],
  providers: [RatingServiceService],
})
export class RatingServiceModule {}
