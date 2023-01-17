import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
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
      return user;
    } catch (error) {
      this.logger.error(`Failed to register user: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginUserDto: LoginUserDto) {
    this.logger.log(`Received login request for ${loginUserDto.email}`);
    try {
      const user = await this.userService.findByEmail(loginUserDto.email);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const isMatch = await this.userService.comparePassword(
        loginUserDto.password,
        user.password,
      );
      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const accessToken = await this.userService.generateAccessToken(user);
      const refreshToken = await this.userService.generateRefreshToken(user);
      this.logger.log(`Successfully logged in user ${user.email}`);
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`Failed to login user: ${error.message}`);
      throw error;
    }
  }
}
