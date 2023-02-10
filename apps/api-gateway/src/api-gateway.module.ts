import { REDIS_OPTIONS, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './Auth/auth.module';
import { BooksModule } from './Book/book.module';
import { CartModule } from './Cart/cart.module';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
    BooksModule,
    AuthModule,
    CartModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
