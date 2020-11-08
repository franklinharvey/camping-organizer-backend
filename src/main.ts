import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	let app: INestApplication;
	if (process.env.MODE === 'PROD') {
		let httpsOptions = {
			key: process.env.SSL_KEY.replace('"', '').replace("'", ''),
			cert: process.env.SSL_CERT.replace('"', '').replace("'", ''),
		};
		app = await NestFactory.create(AppModule);
	} else {
		app = await NestFactory.create(AppModule);
	}

	app.enableCors();
	await app.listen(process.env.PORT);
}
bootstrap().catch(console.error);
