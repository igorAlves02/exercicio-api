import type { Knex } from 'knex';
import { DDDS } from './data/ddds';

export async function up(knex: Knex): Promise<void> {
  await knex.batchInsert('location_ddd', DDDS, 1000);
}

export async function down(knex: Knex): Promise<void> {
  await knex('location_ddd').del();
}
