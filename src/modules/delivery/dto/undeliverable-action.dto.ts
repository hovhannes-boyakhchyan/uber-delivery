import { IsOptional, IsString } from 'class-validator';

export class UndeliverableActionDto {
  @IsString()
  @IsOptional()
  readonly leave_at_door: string;
  @IsString()
  @IsOptional()
  readonly return: string;
}
