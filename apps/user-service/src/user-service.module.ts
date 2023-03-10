import { MONGODB_URI } from '@app/common';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { UserModule } from './User/user.module';

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URI), UserModule, RoleModule],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
