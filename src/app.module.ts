import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './items/item.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
	imports: [
		TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ItemModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
