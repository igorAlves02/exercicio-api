import { Module } from '@nestjs/common';
import { PhoneNumberModule } from './phone-number/phone-number.module';

@Module({
  imports: [PhoneNumberModule],
})
export class AppModule {}
