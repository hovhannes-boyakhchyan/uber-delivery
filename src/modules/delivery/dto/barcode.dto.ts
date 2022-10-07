import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BarcodeTypes } from '../../../constants';

export class BarcodeDto {
  @IsString()
  @IsOptional()
  readonly value: string;
  @IsOptional()
  @IsEnum(BarcodeTypes)
  readonly type: BarcodeTypes;
}
