import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Request,
  Get,
  Put,
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

  @Get('authenticate')
  async authenticate(@Request() req: any) {
    if (!req.headers.authorization) {
      return { message: 'No authorization header' };
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
      const response = await this.client
        .send({ cmd: 'authenticate' }, accessToken)
        .toPromise();
      req.user = response;
      return response;
    } catch (error) {
      return { message: error.message };
    }
  }
}
