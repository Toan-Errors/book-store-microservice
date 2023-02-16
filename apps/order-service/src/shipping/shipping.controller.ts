import { OrderShippingDto } from '@app/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}
  private readonly logger = new Logger(ShippingController.name);

  @MessagePattern({ cmd: 'findAllShipping' })
  async findAllShipping() {
    this.logger.log(`Received find all shipping command`);
    return this.shippingService.findAll();
  }

  @MessagePattern({ cmd: 'findShippingById' })
  async findShippingById(data: { id: string }) {
    this.logger.log(`Received find shipping by id command for ${data.id}`);
    return this.shippingService.findById(data.id);
  }

  @MessagePattern({ cmd: 'createShipping' })
  async createShipping(data: { shipping: OrderShippingDto }) {
    this.logger.log(`Received create shipping command for ${data.shipping}`);
    return this.shippingService.create(data as any);
  }
}
