import { CART_SERVICE, REDIS_OPTIONS } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { CartServiceModule } from './cart-service.module';

const microserviceOptions = {
  name: CART_SERVICE,
  transport: Transport.REDIS,
  options: REDIS_OPTIONS,
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    CartServiceModule,
    microserviceOptions,
  );
  await app.listen();
}
bootstrap();
