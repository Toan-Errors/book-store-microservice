import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto, USER_SERVICE } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject(USER_SERVICE) readonly client: ClientProxy) {}

  @Post('register')
  async register(@Body() registerUserDto: CreateUserDto) {
    try {
      const response = await this.client
        .send({ cmd: 'register' }, registerUserDto)
        .toPromise();
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const response = await this.client
        .send({ cmd: 'login' }, loginUserDto)
        .toPromise();
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('authenticate')
  async authenticate(@Body() token: { accessToken: string }) {
    const { accessToken } = token;
    try {
      const response = await this.client
        .send({ cmd: 'authenticate' }, accessToken)
        .toPromise();
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
