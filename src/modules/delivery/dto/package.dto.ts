import { IsNumber, IsOptional } from 'class-validator';

export class PackageDto {
  @IsNumber()
  @IsOptional()
  readonly bag_count: number;
  @IsNumber()
  @IsOptional()
  readonly drink_count: number;
}
