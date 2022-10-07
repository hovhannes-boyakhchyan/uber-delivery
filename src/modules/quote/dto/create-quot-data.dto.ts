import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuotDataDto {
  @IsNotEmpty()
  @IsString()
  dropoff_address: string;
  @IsNotEmpty()
  @IsString()
  pickup_address: string;
  @IsNumber()
  @IsOptional()
  dropoff_latitude?: number;
  @IsNumber()
  @IsOptional()
  dropoff_longitude?: number;
  @IsString()
  @IsOptional()
  dropoff_phone_number?: string;
  @IsNumber()
  @IsOptional()
  pickup_latitude?: number;
  @IsNumber()
  @IsOptional()
  pickup_longitude?: number;
  @IsString()
  @IsOptional()
  pickup_phone_number?: string;
  @IsString()
  @IsOptional()
  pickup_ready_dt?: string;
  @IsString()
  @IsOptional()
  pickup_deadline_dt?: string;
  @IsString()
  @IsOptional()
  dropoff_ready_dt?: string;
  @IsString()
  @IsOptional()
  dropoff_deadline_dt?: string;
  @IsString()
  @IsOptional()
  manifest_total_value?: number;
  @IsString()
  @IsOptional()
  external_store_id?: string;
}
