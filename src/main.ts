import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	let app = await NestFactory.create(AppModule);

	app.enableCors();
	await app.listen(process.env.PORT || 3000);
}
bootstrap().catch(console.error);
