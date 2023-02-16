import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderShippingDto {
  @IsString()
  @IsNotEmpty()
  readonly shippingMethod: string;

  @IsNumber()
  @IsNotEmpty()
  readonly shippingCost: number;

  @IsString()
  @IsNotEmpty()
  readonly shippingTime: string;
}
