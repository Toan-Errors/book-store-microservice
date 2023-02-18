import { NEWLETTER_SERVICE, REDIS_OPTIONS } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NewletterServiceModule } from './newletter-service.module';

const microserviceOptions = {
  name: NEWLETTER_SERVICE,
  transport: Transport.REDIS,
  options: REDIS_OPTIONS,
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    NewletterServiceModule,
    microserviceOptions,
  );
  await app.listen();
}
bootstrap();
