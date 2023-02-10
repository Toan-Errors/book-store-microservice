import { RATING_SERVICE, REDIS_OPTIONS, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RatingController } from './user.rating.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RATING_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
      {
        name: USER_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
  ],
  controllers: [RatingController],
})
export class RatingModule {}
