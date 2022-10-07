import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateDeliveryDto {
  @IsString()
  @MaxLength(280)
  @IsOptional()
  readonly dropoff_notes: string;
  @IsString()
  @MaxLength(280)
  @IsOptional()
  readonly dropoff_seller_notes: string;
  // dropoff_verification: string; // TODO: This field will be added later.
  @IsString()
  @IsOptional()
  readonly manifest_reference: string;
  @IsString()
  @IsOptional()
  readonly pickup_notes: string;
  // pickup_verification: string; // TODO: This field will be added later.
  @IsBoolean()
  @IsOptional()
  readonly requires_dropoff_signature: boolean;
  @IsBoolean()
  @IsOptional()
  readonly requires_id: boolean;
  @IsNumber()
  @IsOptional()
  readonly tip_by_customer: number;
}
