import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PreviewDto } from './data/preview.dto';
import { PhoneNumberRepository } from './phone-number.repository';
import { SiganApiService } from './sigan-api.service';

const PREVIEW_AMOUNT = 3;

@Injectable()
export class PhoneNumberService {
  private readonly logger = new Logger(PhoneNumberService.name);

  constructor(
    private readonly repository: PhoneNumberRepository,
    private readonly sigan: SiganApiService,
  ) {}

  async createPreview(
    areaCode: string,
    previousId?: string,
  ): Promise<PreviewDto> {
    const isValidDdd = await this.validateDdd(areaCode);
    if (!isValidDdd) {
      this.logger.warn(`Received invalid DDD '${areaCode}'`);
      throw new BadRequestException(`Area code '${areaCode}' does not exist`);
    }

    let previousExternalId: string | undefined;
    if (previousId) {
      const previousReservation = await this.repository.findPreview(previousId);
      if (!previousReservation) {
        this.logger.warn(
          `Received an invalid previousId ${previousId} for preview`,
        );
        throw new NotFoundException(`Preview '${previousId}' not found`);
      }

      previousExternalId = previousReservation.external_id;
    }

    const preReserve = await this.sigan.preReserve(
      areaCode,
      PREVIEW_AMOUNT,
      previousExternalId,
    );
    const previewId = await this.repository.createPreview(
      preReserve.externalId,
      preReserve.msisdns,
    );

    return PreviewDto.ofSigan(
      previewId,
      preReserve.msisdns.map((msisdn) => this.maskMsisdn(msisdn)),
    );
  }

  async validateDdd(ddd: string): Promise<boolean> {
    return await this.repository.findDdd(ddd);
  }

  private maskMsisdn(msisdn: string): string {
    const ddd = msisdn.slice(0, 2);
    const firstDigit = msisdn.charAt(2);
    const lastFourDigits = msisdn.slice(-4);

    return `(${ddd}) ${firstDigit}****-${lastFourDigits}`;
  }
}
