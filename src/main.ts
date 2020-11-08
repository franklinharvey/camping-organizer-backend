// import { NestFactory } from '@nestjs/core';
// import { readFileSync } from 'fs';
// import { AppModule } from './app.module';
import express from 'express';

const app = express();
app.get(
	'/.well-known/acme-challenge/fhPKBIOC-DNcS08rQgHkMrGpCo9o5Q5UA18J7wSFcI0',
	(_, res) => {
		res.send(
			`fhPKBIOC-DNcS08rQgHkMrGpCo9o5Q5UA18J7wSFcI0.EMbtsog1IQM2BxiD8LbPxXgKegEQn8WlYpiaWbWrPHA`,
		);
	},
);

app.listen(process.env.PORT);

// async function bootstrap() {
// 	let httpsOptions = {
// 		key: readFileSync(__dirname + '/../ssl/server.key'),
// 		cert: readFileSync(__dirname + '/../ssl/crt.crt'),
// 	};
// 	const app = await NestFactory.create(AppModule, { httpsOptions });
// 	const expressInstance: express.Express = express();
// 	expressInstance.get('/.well-known/acme-challenge/:id', function(req, res) {
// 		res.send(req.params.id + '.' + httpsOptions.cert.toString());
// 	});

// 	app.enableCors();
// 	await app.listen(process.env.PORT);
// }
// bootstrap();
