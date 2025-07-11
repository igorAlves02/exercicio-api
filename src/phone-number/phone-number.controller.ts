import { Body, Controller, Post } from '@nestjs/common';
import { CreatePreviewDto } from './data/create-preview.dto';
import { PhoneNumberService } from './phone-number.service';

@Controller()
export class PhoneNumberController {
  constructor(private readonly service: PhoneNumberService) {}

  @Post('previews')
createPreview(@Body() body: CreatePreviewDto) {
  const result = this.service.createPreview(body.areaCode, body.previousId);
  return { 
    message: 'Preview criado com sucesso!',
    data: result 
  };
}
}