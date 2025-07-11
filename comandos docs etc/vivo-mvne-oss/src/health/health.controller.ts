import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly service: HealthService) {}

  @Get()
  async getHealth() {
    try {
      await this.service.validateHealth();
    } catch (e) {
      this.logger.error('Health check failed', e);
      throw new ServiceUnavailableException();
    }
  }
}
