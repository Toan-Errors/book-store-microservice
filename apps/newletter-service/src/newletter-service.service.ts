import { Injectable } from '@nestjs/common';

@Injectable()
export class NewletterServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
