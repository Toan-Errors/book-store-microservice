import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PaymentMethod } from './payment.schema';
import { PaymentService } from './payment.service';

@Controller('order')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  private readonly logger = new Logger(PaymentController.name);

  @MessagePattern({ cmd: 'findAllPayment' })
  async findAllPayment() {
    this.logger.log(`Received find all payment command`);
    return this.paymentService.findAll();
  }

  @MessagePattern({ cmd: 'createPayment' })
  async createPayment(data: { payment: PaymentMethod }) {
    this.logger.log(`Received create payment command for ${data.payment}`);
    return this.paymentService.create(data.payment);
  }
}
