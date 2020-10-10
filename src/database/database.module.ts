import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				url: configService.get('DATABASE_URL'),
				type: 'postgres',
				entities: [__dirname + '/../**/*.entity{.ts,.js}'],
				synchronize: false,
			}),
		}),
	],
})
export class DatabaseModule {}
