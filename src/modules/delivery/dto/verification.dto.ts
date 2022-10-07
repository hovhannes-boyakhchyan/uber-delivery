import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BarcodeDto, PincodeDto, PackageDto, IdentificationDto } from './';

export class VerificationDto {
  @IsBoolean()
  @IsOptional()
  readonly signature: boolean;
  @Type(() => BarcodeDto)
  @ValidateNested()
  readonly barcodes: BarcodeDto[];
  @Type(() => PincodeDto)
  @ValidateNested()
  readonly pincode: PincodeDto;
  @Type(() => PackageDto)
  @ValidateNested()
  readonly package: PackageDto;
  @Type(() => IdentificationDto)
  @ValidateNested()
  readonly identification: IdentificationDto;
  @IsBoolean()
  @IsOptional()
  readonly picture: boolean;
}
