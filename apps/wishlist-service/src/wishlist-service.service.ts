import { Injectable } from '@nestjs/common';

@Injectable()
export class WishlistServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
