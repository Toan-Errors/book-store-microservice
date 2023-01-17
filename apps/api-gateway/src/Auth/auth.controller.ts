import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateUserDto, LoginUserDto } from '@app/common';

@Controller('auth')
export class AuthController {
  @Client({ transport: Transport.REDIS })
  client: ClientProxy;

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
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
