import { Module } from '@nestjs/common';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumberService } from './phone-number.service';

@Module({
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService],
})
export class PhoneNumberModule {}
