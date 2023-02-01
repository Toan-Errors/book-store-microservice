import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { CreateUserDto, LoginUserDto } from '@app/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from 'express';

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
      return {
        messages: error.message,
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
}
