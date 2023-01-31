import { REDIS_OPTIONS, USER_SERVICE } from '@app/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';

const microserviceOptions = {
  name: USER_SERVICE,
  transport: Transport.REDIS,
  options: REDIS_OPTIONS,
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    UserServiceModule,
    microserviceOptions,
  );
  await app.listen();
  Logger.log('User microservice is listening');
}
bootstrap();
