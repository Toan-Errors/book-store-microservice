import { MONGODB_URI } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewletterServiceController } from './newletter-service.controller';
import { NewletterServiceService } from './newletter-service.service';
import { NewletterModule } from './newletter/newletter.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), NewletterModule],
  controllers: [NewletterServiceController],
  providers: [NewletterServiceService],
})
export class NewletterServiceModule {}
