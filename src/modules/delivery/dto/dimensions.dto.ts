import { IsNumber, IsOptional } from 'class-validator';

export class DimensionsDto {
  @IsNumber()
  @IsOptional()
  readonly length: number;
  @IsNumber()
  @IsOptional()
  readonly height: number;
  @IsNumber()
  @IsOptional()
  readonly depth: number;
}
