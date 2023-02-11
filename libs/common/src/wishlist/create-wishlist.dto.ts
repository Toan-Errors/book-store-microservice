import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsString()
  @IsNotEmpty()
  readonly bookId: string;
}
