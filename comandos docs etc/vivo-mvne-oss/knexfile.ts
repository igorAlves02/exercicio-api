import type { Knex } from 'knex';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://zup:zup@localhost/zup',
    searchPath: ['oss', 'public'],
    migrations: {
      schemaName: 'oss',
    },
  },
} as Knex.Config;
