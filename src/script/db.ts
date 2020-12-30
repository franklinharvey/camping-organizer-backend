import { exec } from 'child_process';
import { URL } from 'url';
import { promisify } from 'util';

import ormconfig from '../db/config';

interface PGConfig {
	url: string;
}

async function run(): Promise<void> {
	const config = ormconfig as PGConfig;

	const db = new URL(config.url).pathname.split('/')[1];
	if (!db) throw new Error(`no db found in url ${config.url}`);
	const query =
		process.argv[process.argv.length - 1] === 'drop'
			? `DROP DATABASE ${db};`
			: `CREATE DATABASE ${db};`;

	const cmd = `psql ${config.url} -c ${query}`;

	console.error(`Executing query: "${cmd}"`);
	await promisify(exec)(cmd);
}

run()
	.catch(console.error) // tslint:disable-line:no-console
	.finally(process.exit);
