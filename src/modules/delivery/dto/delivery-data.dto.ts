import { StructuredAddressDto, ProductDto } from './';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class DeliveryDataDto {
  @Type(() => StructuredAddressDto)
  @ValidateNested()
  readonly pickupAddress: StructuredAddressDto;
  @Type(() => StructuredAddressDto)
  @ValidateNested()
  readonly dropoffAddress: StructuredAddressDto;
  @IsNotEmpty()
  @IsString()
  readonly dropoffPhoneNumber: string;
  @IsNotEmpty()
  @IsString()
  readonly dropoffName: string;
  @IsString()
  @IsOptional()
  readonly dropoffEmail: string;
  @IsString()
  @IsOptional()
  readonly dropoffInstructions: string;
  @IsString()
  @IsOptional()
  readonly pickupInstructions: string;
  @IsNotEmpty()
  @IsString()
  readonly pickupPhoneNumber: string;
  @IsDateString()
  @IsOptional()
  readonly pickupStartTime: string;
  @IsNumber()
  @IsOptional()
  readonly orderValue: string;
  @IsNumber()
  @IsOptional()
  readonly itemsCount: number;
  @IsNumber()
  @IsOptional()
  readonly tip: number;
  @Type(() => ProductDto)
  @ValidateNested()
  readonly products: ProductDto[];
  @IsString()
  @IsOptional()
  readonly externalStoreId: string;
  @IsString()
  @IsOptional()
  readonly deliveryExternalReference: string;
  @IsString()
  @IsOptional()
  readonly pickupBusinessName: string;
  @IsString()
  @IsOptional()
  readonly controlledContents: string;
}
