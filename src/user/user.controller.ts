import {
	Controller,
	Get,
	Post,
	Param,
	Body,
	Inject,
	ParseUUIDPipe,
} from '@nestjs/common';
import { GetItemDto } from 'src/items/dto/GetItem.dto';
import { CreateUserDto } from './dto/CreateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(@Inject(UserService) private service: UserService) {}

	@Post()
	async createUser(@Body() dto: CreateUserDto): Promise<GetUserDto> {
		const user = await this.service.create(dto);
		return this.service.entityToDto(user);
	}

	@Get()
	async getAll() {
		return await this.service.getAll();
	}

	@Get(':id')
	async getOne(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<GetUserDto | undefined> {
		const user = await this.service.getOneOrFail(id);
		return this.service.entityToDto(user);
	}

	@Get(':id/items')
	async getItems(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<GetItemDto[]> {
		return this.service.getItemsForUser(id);
	}
}
