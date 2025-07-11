import { Injectable } from '@nestjs/common';
import { InjectKnex } from 'nestjs-knex';
import { LocationDdd } from './data/location-ddd';
import { Preview } from './data/preview';
import { PreviewNumber } from './data/preview-number';
import type { Knex } from 'knex';

@Injectable()
export class PhoneNumberRepository {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async findDdd(ddd: string): Promise<boolean> {
    const result = await this.knex<LocationDdd>('location_ddd')
      .first('ddd')
      .where('ddd', ddd);

    return Boolean(result);
  }

  async findPreview(id: string): Promise<Preview | undefined> {
    return await this.knex<Preview>('preview').first('*').where('id', id);
  }

  async createPreview(externalId: string, msisdns: string[]): Promise<string> {
    return await this.knex.transaction(async (trx: Knex.Transaction) => {
      const [preview] = await trx<Preview>('preview')
        .insert({ external_id: externalId })
        .returning('id');

      await trx<PreviewNumber>('preview_number').insert(
        msisdns.map((msisdn, i) => ({
          preview_id: preview.id,
          msisdn,
          index: i + 1,
        })),
      );

      return preview.id;
    });
  }
}
