import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://toanerror:5sonline@cluster1.vquj40v.mongodb.net/bookstore',
    ),
    UserModule,
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
