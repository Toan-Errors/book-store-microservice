import { IsNotEmpty, IsString } from 'class-validator';

// country: user?.country || "",
//       city: user?.city || "",
//       district: user?.district || "",
//       wards: user?.wards || "",
//       address: user?.address || "",

export class AddressDetailDto {
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly wards: string;

  @IsString()
  @IsNotEmpty()
  readonly district: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;
}
