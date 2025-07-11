import { IsNumberString, IsOptional, IsUUID, Length } from 'class-validator';

export class CreatePreviewDto {
  @IsNumberString()
  @Length(2, 2)
  areaCode: string;

  @IsUUID(4)
  @IsOptional()
  previousId?: string;
}
