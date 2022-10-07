import { StructuredAddressDto, ManifestItemDto, VerificationDto } from './';
import { DeliverableAction } from '../../../constants';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsDateString,
  ValidateNested,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UndeliverableActionDto } from './undeliverable-action.dto';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsString()
  readonly dropoff_address: string;
  @IsNotEmpty()
  @IsString()
  readonly dropoff_name: string;
  @IsNotEmpty()
  @IsString()
  readonly dropoff_phone_number: string;
  @Type(() => ManifestItemDto)
  @ValidateNested()
  readonly manifest_items: ManifestItemDto[];
  @IsNotEmpty()
  @IsString()
  readonly pickup_address: string;
  @IsNotEmpty()
  @IsString()
  readonly pickup_name: string;
  @IsNotEmpty()
  @IsString()
  readonly pickup_phone_number: string;
  @IsEnum(DeliverableAction)
  readonly deliverable_action?: DeliverableAction;
  @IsString()
  @IsOptional()
  readonly dropoff_business_name?: string;
  @IsNumber()
  @IsOptional()
  readonly dropoff_latitude?: number;
  @IsNumber()
  @IsOptional()
  readonly dropoff_longitude?: number;
  @IsString()
  @IsOptional()
  readonly dropoff_notes: string;
  @IsString()
  @IsOptional()
  readonly dropoff_seller_notes?: string;
  @Type(() => VerificationDto)
  @ValidateNested()
  readonly dropoff_verification?: VerificationDto;
  @IsString()
  @IsOptional()
  readonly manifest_reference?: string;
  @IsNumber()
  @IsOptional()
  readonly manifest_total_value: number;
  @IsString()
  @IsOptional()
  readonly pickup_business_name: string;
  @IsNumber()
  @IsOptional()
  readonly pickup_latitude?: number;
  @IsNumber()
  @IsOptional()
  readonly pickup_longitude?: number;
  @IsString()
  @IsOptional()
  readonly pickup_notes: string;
  @Type(() => VerificationDto)
  @ValidateNested()
  readonly pickup_verification?: VerificationDto;
  @IsString()
  @IsOptional()
  readonly quote_id?: string;
  @Type(() => UndeliverableActionDto)
  @ValidateNested()
  undeliverable_action?: UndeliverableActionDto;
  @IsDateString()
  @IsOptional()
  readonly pickup_ready_dt: string;
  @IsDateString()
  @IsOptional()
  readonly pickup_deadline_dt?: string;
  @IsDateString()
  @IsOptional()
  readonly dropoff_ready_dt?: string;
  @IsDateString()
  @IsOptional()
  readonly dropoff_deadline_dt?: string;
  @IsNumber()
  @IsOptional()
  readonly tip: number;
  @IsString()
  @IsOptional()
  readonly idempotency_key?: string;
  @IsString()
  @IsOptional()
  readonly external_store_id: string;
  @Type(() => VerificationDto)
  @ValidateNested()
  readonly return_verification?: VerificationDto;
}
