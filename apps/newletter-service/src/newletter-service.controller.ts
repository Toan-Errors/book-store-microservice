import { Controller, Get } from '@nestjs/common';
import { NewletterServiceService } from './newletter-service.service';

@Controller()
export class NewletterServiceController {
  constructor(private readonly newletterServiceService: NewletterServiceService) {}

  @Get()
  getHello(): string {
    return this.newletterServiceService.getHello();
  }
}
