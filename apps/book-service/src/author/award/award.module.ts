import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AwardController } from './award.cotroller';
import { Award, AwardSchema } from './award.schema';
import { AwardService } from './award.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Award.name,
        schema: AwardSchema,
      },
    ]),
  ],
  controllers: [AwardController],
  providers: [AwardService],
})
export class AwardModule {}
