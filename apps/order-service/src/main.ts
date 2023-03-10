import { ORDER_SERVICE, REDIS_OPTIONS } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { OrderServiceModule } from './order-service.module';

const microserviceOptions = {
  name: ORDER_SERVICE,
  transport: Transport.REDIS,
  options: REDIS_OPTIONS,
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    OrderServiceModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
