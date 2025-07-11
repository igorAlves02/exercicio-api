import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePreviewDto } from './data/create-preview.dto';
import { PhoneNumberService } from './phone-number.service';
import { PreviewDto } from './data/preview.dto';
import { ValidateDddDto } from './data/validate-ddd.dto';

@Controller()
export class PhoneNumberController {
  constructor(private readonly service: PhoneNumberService) {}

  @Post('previews')
  async createPreview(@Body() body: CreatePreviewDto): Promise<PreviewDto> {
    return await this.service.createPreview(body.areaCode, body.previousId);
  }

  @Get('ddds/:ddd')
  @HttpCode(204)
  async validateDdd(@Param() params: ValidateDddDto): Promise<void> {
    const isValid = await this.service.validateDdd(params.ddd);

    if (!isValid) {
      throw new NotFoundException(`DDD '${params.ddd}' doesn't exit`);
    }
  }
}
