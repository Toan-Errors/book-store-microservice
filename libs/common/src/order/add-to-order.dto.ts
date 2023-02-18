import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AddressDetailDto } from './address_detail.dto';
import { OrderShippingDto } from './order-shipping.dto';

export class AddToOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  delivery_address: AddressDetailDto;

  @IsNotEmpty()
  @IsString()
  payment: string;

  @IsNotEmpty()
  shipping: OrderShippingDto;

  @IsNotEmpty()
  items: any[];

  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
