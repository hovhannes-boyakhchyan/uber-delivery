import { IsNumber } from 'class-validator';

export class IdentificationDto {
  @IsNumber()
  readonly min_age: number;
}
