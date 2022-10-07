import { IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { Statuses } from '../../../constants';

export class GetDeliveryListDto {
  @IsEnum(Statuses)
  @IsOptional()
  readonly filter: Statuses;
  @IsNumberString()
  @IsOptional()
  readonly limit: number;
  @IsNumberString()
  @IsOptional()
  readonly offset: number;
}
