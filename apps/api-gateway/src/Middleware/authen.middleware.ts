import { REDIS_OPTIONS } from '@app/common';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthenticationMiddleware {
  constructor(@Inject('USER_SERVICE') readonly client: ClientProxy) {}

  async use(req: any, res: any, next: () => void) {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
      throw new HttpException(
        'Access token is required',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
      const response = await this.client
        .send({ cmd: 'authenticate' }, accessToken.split(' ')[1])
        .toPromise();
      if (!response.user) {
        throw new HttpException(
          'Invalid access token',
          HttpStatus.UNAUTHORIZED,
        );
      }
      next();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
