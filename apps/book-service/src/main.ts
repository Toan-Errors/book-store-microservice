import { BOOK_SERVICE, REDIS_OPTIONS } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { BookServiceModule } from './book-service.module';

const microserviceOptions = {
  name: BOOK_SERVICE,
  transport: Transport.REDIS,
  options: REDIS_OPTIONS,
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    BookServiceModule,
    microserviceOptions,
  );
  await app.listen();
}
bootstrap();
