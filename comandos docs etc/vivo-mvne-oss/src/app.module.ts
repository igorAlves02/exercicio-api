import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PhoneNumberModule } from './phone-number/phone-number.module';
import { KnexModule } from 'nestjs-knex';
import { config } from './config/config.provider';

const KNEX_CONFIG = config.getKnexConfig();

@Module({
  imports: [
    KnexModule.forRoot({ config: KNEX_CONFIG }),
    HealthModule,
    PhoneNumberModule,
  ],
})
export class AppModule {}
