import {
  IsString,
  IsNumber,
  IsDateString,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StructuredAddressDto } from '../../delivery/dto';

export class CreateQuoteDto {
  @Type(() => StructuredAddressDto)
  @ValidateNested()
  readonly dropoffAddress: StructuredAddressDto;
  @Type(() => StructuredAddressDto)
  @ValidateNested()
  readonly pickupAddress: StructuredAddressDto;
  @IsString()
  @IsOptional()
  readonly dropoffPhoneNumber: string;
  @IsString()
  @IsOptional()
  readonly pickupPhoneNumber: string;
  @IsDateString()
  @IsOptional()
  readonly pickupStartTime: string;
  @IsDateString()
  @IsOptional()
  readonly pickupEndTime: string;
  @IsDateString()
  @IsOptional()
  readonly dropoffStartTime: string;
  @IsDateString()
  @IsOptional()
  readonly dropoffEndTime: string;
  @IsNumber()
  @IsOptional()
  readonly orderValue: number;
  @IsNumber()
  @IsOptional()
  readonly itemsCount: number;
  @IsString()
  @IsOptional()
  readonly externalStoreId: string;
  @IsString()
  @IsOptional()
  readonly pickupBusinessName: string;
  @IsString()
  @IsOptional()
  readonly dropoffName: string;
  @IsString()
  @IsOptional()
  readonly dropoffInstructions: string;
  @IsString()
  @IsOptional()
  readonly pickupInstructions: string;
  @IsNumber()
  @IsOptional()
  readonly tax: number;
  @IsNumber()
  @IsOptional()
  readonly tip: number;
}
