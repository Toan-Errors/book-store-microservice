import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from '@app/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'register' })
  async register(createUserDto: CreateUserDto) {
    this.logger.log(`Received registration request for ${createUserDto.email}`);
    try {
      const user = await this.userService.create(createUserDto);
      this.logger.log(`Successfully registered user ${user.email}`);
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + 3600);

      const accessToken = await this.userService.generateAccessToken(user);
      const refreshToken = await this.userService.generateRefreshToken(user);

      return { accessToken, refreshToken, user };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Received login request for ${loginUserDto.email}`);
    try {
      const user = await this.userService.findByEmail(loginUserDto.email);
      if (!user) {
        return {
          message: 'Email is not registered',
        };
      }
      const isMatch = await this.userService.comparePassword(
        loginUserDto.password,
        user.password,
      );
      if (!isMatch) {
        return {
          message: 'Password is incorrect',
        };
      }

      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + 3600);

      const accessToken = await this.userService.generateAccessToken(user);
      const refreshToken = await this.userService.generateRefreshToken(user);
      this.logger.log(`Successfully logged in user ${user.email}`);
      return { accessToken, refreshToken, user };
    } catch (error) {
      return {
        message: 'Email or password is incorrect',
      };
    }
  }

  @MessagePattern({ cmd: 'authenticate' })
  async authenticate(token: string) {
    this.logger.log(`Received authentication request for token ${token}`);
    try {
      const user = await this.userService.verifyAccessToken(token);
      if (!user) {
        return {
          message: 'Invalid token',
        };
      }
      this.logger.log(`Successfully authenticated user ${user.email}`);
      return { user };
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

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
