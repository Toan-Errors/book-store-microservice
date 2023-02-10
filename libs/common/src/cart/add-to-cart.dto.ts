import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddToCartDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly bookId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly coverImage: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price_sale: number;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
}
