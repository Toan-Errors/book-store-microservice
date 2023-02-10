import { RATING_SERVICE, REDIS_OPTIONS } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { RatingServiceModule } from './rating-service.module';

const microserviceOptions = {
  name: RATING_SERVICE,
  transport: Transport.REDIS,
  options: REDIS_OPTIONS,
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    RatingServiceModule,
    microserviceOptions,
  );
  await app.listen();
}
bootstrap();
