import { IsNotEmpty, IsString } from 'class-validator';

export class OrderPaymentDto {
  @IsString()
  @IsNotEmpty()
  readonly paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  readonly paymentStatus: string;

  @IsString()
  @IsNotEmpty()
  readonly paymentId: string;
}
