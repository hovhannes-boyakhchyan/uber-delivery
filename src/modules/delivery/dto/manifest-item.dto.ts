import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Size } from '../../../constants';
import { DimensionsDto } from './dimensions.dto';
import { Type } from 'class-transformer';

export class ManifestItemDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsNumber()
  readonly quantity: number;
  @IsNotEmpty()
  @IsEnum(Size)
  readonly size?: Size;
  @Type(() => DimensionsDto)
  @ValidateNested()
  readonly dimensions?: DimensionsDto;
  @IsBoolean()
  @IsOptional()
  readonly must_be_upright?: boolean;
  @IsNumber()
  @IsOptional()
  readonly weight?: number;
  @IsNumber()
  @IsOptional()
  readonly perishability?: number;
  @IsNumber()
  @IsOptional()
  readonly preparation_time?: number;
}
