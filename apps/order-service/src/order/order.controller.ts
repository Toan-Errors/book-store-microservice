import { Controller, Injectable, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Order } from './order.schema';
import { OrderService } from './order.service';

@Injectable()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  private readonly logger = new Logger(OrderController.name);

  @MessagePattern({ cmd: 'findAllOrders' })
  async findAllOrders() {
    return this.orderService.findAll();
  }

  @MessagePattern({ cmd: 'findOrderByUserId' })
  async findOrderByUserId(data: { userId: string }) {
    return this.orderService.findByUserId(data.userId);
  }

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(order: Order) {
    this.logger.log(`Creating a new order: ${JSON.stringify(order)}`);
    return this.orderService.create(order);
  }

  @MessagePattern({ cmd: 'updateOrderStatus' })
  async updateOrderStatus(data: { orderId: string; status: string }) {
    this.logger.log(
      `Updating order with id: ${data.orderId}. New status: ${data.status}`,
    );
    return this.orderService.updateStatus(data.orderId, data.status);
  }

  @MessagePattern({ cmd: 'getAllOrders' })
  async getAllOrders(data: {
    query: any;
    page: number;
    limit: number;
  }): Promise<Order[]> {
    this.logger.log(`Getting all orders`);
    return this.orderService.getAllOrders(data.query, data.page, data.limit);
  }
}
