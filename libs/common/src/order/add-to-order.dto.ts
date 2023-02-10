import { IsNotEmpty, IsString } from 'class-validator';

export class AddToOrderDto {
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

  @IsString()
  @IsNotEmpty()
  readonly price: string;

  @IsString()
  @IsNotEmpty()
  readonly price_sale: string;

  @IsString()
  @IsNotEmpty()
  readonly quantity: string;
}
