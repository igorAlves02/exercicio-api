import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('sim', (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('iccid', 64).notNullable();
    table.string('carrier_tag', 32).notNullable();
    table.uuid('line_id').notNullable();
    table.string('vivo_imsi', 64).notNullable();
    table.string('sim_type', 16).notNullable();
    table.string('technology', 16).notNullable();
    table.string('status', 32).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    table.primary(['id']);
    table.foreign('carrier_tag').references('tag').inTable('bss_core.carrier');
    table.foreign('line_id').references('id').inTable('bss_core.line');
    table.index(['iccid'], 'idx_sim_iccid');
    table.index(['line_id'], 'idx_sim_line_id');
    table.index(['vivo_imsi'], 'idx_sim_vivo_imsi');
  });

  await knex.schema.createTable('sim_card', (table) => {
    table.uuid('sim_id').notNullable();
    table.string('hrs_imsi', 64);
    table.specificType('delivery_address_hash', 'char(32)').notNullable();
    table.primary(['sim_id']);
    table.foreign('sim_id').references('id').inTable('sim');
    table
      .foreign('delivery_address_hash')
      .references('hash')
      .inTable('bss_core.address');
  });

  await knex.schema.createTable('device_model', (table) => {
    table.specificType('hash', 'char(32)');
    table.string('model', 128);
    table.string('tac', 128);
    table.string('code', 128);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.primary(['hash']);
    table.index(['tac'], 'idx_device_tac');
    table.index(['model'], 'idx_device_model');
    table.index(['code'], 'idx_device_code');
  });

  await knex.schema.createTable('esim', (table) => {
    table.uuid('sim_id').notNullable();
    table.string('matching_id', 64);
    table.string('smdp_plus_address', 128);
    table.specificType('device_model_hash', 'char(32)').notNullable();
    table.primary(['sim_id']);
    table.foreign('sim_id').references('id').inTable('sim');
    table
      .foreign('device_model_hash')
      .references('hash')
      .inTable('device_model');
    table.index(['matching_id'], 'idx_esim_matching_id');
  });

  await knex.schema.createTable('phone_number', (table) => {
    table.specificType('msisdn', 'char(11)').notNullable();
    table.string('origin', 32).notNullable();
    table.string('status', 32).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('assigned_at');
    table.timestamp('updated_at');
    table.uuid('assigned_sim_id');
    table.primary(['msisdn']);
    table.foreign('assigned_sim_id').references('id').inTable('sim');
    table.index(['assigned_sim_id'], 'idx_phone_number_sim');
  });

  await knex.schema.createTable('preview', (table) => {
    table.uuid('id').notNullable().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('external_id', 64).notNullable();
    table.specificType('reserved_msisdn', 'char(11)');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.primary(['id']);
    table.index(['external_id'], 'idx_preview_external_id');
    table.index(['reserved_msisdn'], 'idx_preview_reserved_msisdn');
  });

  await knex.schema.createTable('preview_number', (table) => {
    table.uuid('preview_id').notNullable();
    table.specificType('msisdn', 'char(11)').notNullable();
    table.integer('index').notNullable();
    table.primary(['preview_id', 'msisdn']);
    table.foreign('preview_id').references('id').inTable('preview');
    table.index(['msisdn'], 'idx_preview_number_msisdn');
  });

  await knex.schema.createTable('location_ddd', (table) => {
    table.integer('location_cnl').notNullable();
    table.specificType('ddd', 'char(2)').notNullable();
    table.primary(['location_cnl']);
    table.index(['ddd'], 'idx_location_ddd');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('location_ddd');
  await knex.schema.dropTableIfExists('preview_number');
  await knex.schema.dropTableIfExists('preview');
  await knex.schema.dropTableIfExists('phone_number');
  await knex.schema.dropTableIfExists('esim');
  await knex.schema.dropTableIfExists('device_model');
  await knex.schema.dropTableIfExists('sim_card');
  await knex.schema.dropTableIfExists('sim');
}
