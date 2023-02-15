import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@app/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'changeAvatar' })
  async changeAvatar(userId: string, avatar: string) {
    this.logger.log(`Received change avatar request for user ${userId}`);
    return this.userService.changeAvatar(userId, avatar);
  }

  @MessagePattern({ cmd: 'updateProfile' })
  async updateProfile(data: {
    userId: string;
    body: CreateUserDto;
  }): Promise<CreateUserDto> {
    this.logger.log(`Received update profile request for user ${data.userId}`);
    return this.userService.updateProfile(data.userId, data.body);
  }

  @MessagePattern({ cmd: 'addDeliveryAddress' })
  async addDeliveryAddress(data: {
    userId: string;
    address: any;
  }): Promise<CreateUserDto> {
    this.logger.log(
      `Received add delivery address request for user ${data.userId}`,
    );
    const id =
      Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    data.address.id = id;
    return this.userService.addDeliveryAddress(data.userId, data.address);
  }

  @MessagePattern({ cmd: 'removeDeliveryAddress' })
  async removeDeliveryAddress(data: {
    userId: string;
    addressId: string;
  }): Promise<CreateUserDto> {
    this.logger.log(
      `Received remove delivery address request for user ${data.userId}`,
    );
    return this.userService.removeDeliveryAddress(data.userId, data.addressId);
  }

  @MessagePattern({ cmd: 'updateDeliveryAddress' })
  async updateDeliveryAddress(data: {
    userId: string;
    addressId: string;
    address: any;
  }): Promise<CreateUserDto> {
    this.logger.log(
      `Received update delivery address request for user ${data.userId}`,
    );
    return this.userService.updateDeliveryAddress(
      data.userId,
      data.addressId,
      data.address,
    );
  }
}
