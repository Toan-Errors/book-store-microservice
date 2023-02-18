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

  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly isDefault: boolean;

  @IsString()
  readonly isDeleted: boolean;

  @IsString()
  readonly createdAt: Date;

  @IsString()
  readonly updatedAt: Date;
}
