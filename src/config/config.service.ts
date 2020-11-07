import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

class ConfigService {
	constructor(private env: { [k: string]: string | undefined }) {}

	private getValue(key: string, throwOnMissing = true): string {
		const value = this.env[key];
		if (!value && throwOnMissing) {
			throw new Error(`config error - missing env.${key}`);
		}

		return value;
	}

	public ensureValues(keys: string[]) {
		keys.forEach(k => this.getValue(k, true));
		return this;
	}

	public getPort() {
		return this.getValue('PORT', true);
	}

	public isProduction() {
		const mode = this.getValue('MODE', false);
		return mode != 'DEV';
	}

	public getTypeOrmConfig(): TypeOrmModuleOptions {
		if (this.getValue('DATABASE_URL', false)) {
			return {
				type: 'postgres',

				url: this.getValue('DATABASE_URL'),

				entities: [__dirname + '/../**/*.entity{.ts,.js}'],

				migrationsTableName: 'migration',

				migrations: [__dirname + '/../migration/*.ts'],

				cli: {
					migrationsDir: 'migration',
				},

				synchronize: false,

				ssl: this.isProduction(),
			};
		}
		return {
			type: 'postgres',

			host: this.getValue('POSTGRES_HOST'),
			port: parseInt(this.getValue('POSTGRES_PORT')),
			username: this.getValue('POSTGRES_USER'),
			password: this.getValue('POSTGRES_PASSWORD'),
			database: this.getValue('POSTGRES_DB'),

			entities: [__dirname + '/../**/*.entity{.ts,.js}'],

			migrationsTableName: 'migration',

			migrations: [__dirname + '/../migration/*.ts'],

			cli: {
				migrationsDir: 'migration',
			},

			synchronize: false,
		};
	}
}

const configService = new ConfigService(process.env).ensureValues([
	'POSTGRES_HOST',
	'POSTGRES_PORT',
	'POSTGRES_USER',
	'POSTGRES_PASSWORD',
	'POSTGRES_DB',
]);

export { configService };
