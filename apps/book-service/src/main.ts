import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { BookServiceModule } from './book-service.module';

const microserviceOptions = {
  name: 'BOOK_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: 'redis://redis:6379',
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    BookServiceModule,
    microserviceOptions,
  );
  await app.listen();
}
bootstrap();
