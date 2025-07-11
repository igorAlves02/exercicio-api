import { IsNumberString, Length } from 'class-validator';

export class ValidateDddDto {
  @IsNumberString()
  @Length(2, 2)
  ddd: string;
}
