import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';

config(); // Loads .env file

const configService = new ConfigService();

console.warn(process.env.DATABASE_URL);
if (!configService.get('DATABASE_URL')) {
	throw new Error('no database url in env');
}

// Check typeORM documentation for more information.
const configPG: ConnectionOptions = {
	type: 'postgres',
	url: configService.get('DATABASE_URL'),

	entities: [__dirname + '/../**/*.entity{.ts,.js}'],

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	migrationsRun: false,

	logging: 'all',

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
	cli: {
		// Location of migration should be inside src folder
		// to be compiled into dist/ folder.
		migrationsDir: 'src/db/migrations',
	},
};

export default configPG;
