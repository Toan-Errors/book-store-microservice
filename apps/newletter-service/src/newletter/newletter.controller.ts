import { Controller, Logger } from '@nestjs/common';
import { NewletterService } from './newletter.service';

@Controller('newletter')
export class NewletterController {
  constructor(private readonly newletterService: NewletterService) {}
  private readonly logger = new Logger(NewletterController.name);
}
