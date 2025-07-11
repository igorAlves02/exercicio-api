import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class HealthService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  async validateHealth() {
    await this.knex.raw('select null;');
  }
}
