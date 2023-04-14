import { REDIS_OPTIONS, USER_SERVICE } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminUserController } from './admin.auth.controller';
import { AuthController } from './auth.controller';
import { UserUserController } from './user.auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.REDIS,
        options: REDIS_OPTIONS,
      },
    ]),
  ],
  controllers: [AuthController, UserUserController, AdminUserController],
})
export class AuthModule {}
