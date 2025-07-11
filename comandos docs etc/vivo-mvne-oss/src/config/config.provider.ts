import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { CONFIG_PATH, DEFAULT_CONFIG_PATH } from './config.constants';
import type { Knex } from 'knex';
import type { HttpModuleOptions } from '@nestjs/axios';

export class ConfigProvider {
  private readonly config: Record<string, string | undefined>;

  constructor(configPath: string, defaultConfigPath: string) {
    this.assertConfig(configPath, defaultConfigPath);
    this.config = { ...this.fromFile(configPath), ...process.env };
  }

  get(key: string): string {
    const value = this.getOptional(key);
    if (typeof value === 'undefined') {
      throw new Error(`Missing '${key}' config`);
    }

    return value.toString();
  }

  getNumber(key: string): number {
    const value = Number(this.get(key));
    if (isNaN(value)) {
      throw new TypeError(`The config '${key}' isn't a number`);
    }

    return value;
  }

  getKnexConfig(): Knex.Config {
    return {
      client: 'pg',
      connection: this.get('PG_CONNECTION_STRING'),
      searchPath: [this.get('PG_SEARCH_PATH'), 'public'],
      pool: {
        min: this.getNumber('PG_POOL_MIN'),
        max: this.getNumber('PG_POOL_MAX'),
      },
    };
  }

  getHttpSiganConfig(): HttpModuleOptions {
    return {
      baseURL: this.get('HTTP_SIGAN_URL'),
    };
  }

  getOptional(key: string): string | undefined {
    return this.config[key];
  }

  private fromFile(path: string): Record<string, string> {
    const file = fs.readFileSync(path);
    return dotenv.parse(file);
  }

  private assertConfig(configPath: string, defaultConfigPath: string) {
    if (fs.existsSync(configPath)) {
      return;
    }

    fs.copyFileSync(defaultConfigPath, configPath);
  }
}

export const config = new ConfigProvider(CONFIG_PATH, DEFAULT_CONFIG_PATH);
