import { Injectable } from '@nestjs/common';
import { SiganPreReserveDto } from './data/sigan-pre-reserve.dto';
import { HttpService } from '@nestjs/axios';
import { ResourceCapacityDemand } from './data/sigan-api.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SiganApiService {
  constructor(private readonly sigan: HttpService) {}

  async preReserve(
    areaCode: string,
    count: number,
    lastExternalId: string | null = null,
  ): Promise<SiganPreReserveDto> {
    const request = {
      resourceCapacityDemand: {
        capacityDemandAmount: count,
        characteristic: [
          {
            name: 'LAST_SEARCH',
            value: lastExternalId,
          },
        ],
        place: {
          cnl: null,
        },
        resourcePool: {
          resource: {
            value: areaCode,
            '@referredType': 'number',
            relatedParty: [
              {
                referredType: 'APPLICATION',
                id: 'VIVOEASY',
                role: 'OWNER',
              },
            ],
            characteristic: [
              {
                name: 'CATEGORY',
                value: 'Normal',
              },
              {
                name: 'DDI',
                value: '55',
              },
              {
                name: 'TYPE_NETWORK',
                value: 'M',
              },
            ],
          },
        },
      },
      type: 'phone number',
    };

    const { data } = await firstValueFrom(
      this.sigan.post<ResourceCapacityDemand>(
        '/resourcePoolManagement/v4/availability-check',
        request,
      ),
    );

    return {
      externalId: data.resourceCapacityDemand.resourceSpecification.id,
      timeout: Number(
        data.resourceCapacityDemand.resourceSpecification.capacityTimePeriod,
      ),
      msisdns: data.resourceCapacityDemand.resourcePool.map(
        (r) => r.resource.value,
      ),
    };
  }
}
