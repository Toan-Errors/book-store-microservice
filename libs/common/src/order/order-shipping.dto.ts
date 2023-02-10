import { IsNotEmpty, IsString } from 'class-validator';

export class OrderShippingDto {
  @IsString()
  @IsNotEmpty()
  readonly shippingMethod: string;

  @IsString()
  @IsNotEmpty()
  readonly shippingStatus: string;

  @IsString()
  @IsNotEmpty()
  readonly shippingId: string;
}
