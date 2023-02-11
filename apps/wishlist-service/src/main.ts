import { REDIS_OPTIONS, WISHLIST_SERVICE } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { WishlistServiceModule } from './wishlist-service.module';

const microserviceOptions = {
  name: WISHLIST_SERVICE,
  transport: Transport.REDIS,
  options: REDIS_OPTIONS,
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    WishlistServiceModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
