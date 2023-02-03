import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly subtitle: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsOptional()
  readonly country: string;

  @IsString()
  @IsOptional()
  readonly ageGroup: string;

  @IsString()
  @IsOptional()
  readonly saleDate: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly publisher: string;

  @IsBoolean()
  @IsOptional()
  readonly adultReaders: boolean;

  @IsArray()
  @IsOptional()
  readonly genres: string[];

  @IsNumber()
  @IsOptional()
  readonly pages: number;

  @IsString()
  @IsOptional()
  readonly coverImage: string;

  @IsArray()
  @IsOptional()
  readonly images: string[];

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly language: string;
}
