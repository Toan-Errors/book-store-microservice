import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewletterController } from './newletter.controller';
import { Newletter, NewletterSchema } from './newletter.schema';
import { NewletterService } from './newletter.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Newletter.name,
        schema: NewletterSchema,
      },
    ]),
  ],
  controllers: [NewletterController],
  providers: [NewletterService],
})
export class NewletterModule {}
