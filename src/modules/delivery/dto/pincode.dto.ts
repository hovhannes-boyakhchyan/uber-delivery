import { IsBoolean, IsString } from 'class-validator';

export class PincodeDto {
  @IsBoolean()
  readonly enabled: boolean;
  @IsString()
  readonly value: string;
}
