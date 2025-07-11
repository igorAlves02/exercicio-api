import { Module } from '@nestjs/common';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumberRepository } from './phone-number.repository';
import { HttpModule } from '@nestjs/axios';
import { SiganApiService } from './sigan-api.service';
import { config } from '../config/config.provider';

@Module({
  imports: [HttpModule.register(config.getHttpSiganConfig())],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService, PhoneNumberRepository, SiganApiService],
})
export class PhoneNumberModule {}
