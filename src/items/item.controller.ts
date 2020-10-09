import {
	Controller,
	Get,
	Post,
	Param,
	Body,
	Inject,
	ParseUUIDPipe,
	Delete,
} from '@nestjs/common';
import { CreateItemDto } from './dto/CreateItem.dto';
import { GetItemDto } from './dto/GetItem.dto';

import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
	constructor(@Inject(ItemService) private service: ItemService) {}

	@Post()
	async createItem(@Body() dto: CreateItemDto): Promise<GetItemDto> {
		const item = await this.service.create(dto);
		return this.service.entityToDto(item);
	}

	@Get(':id')
	async getOne(
		@Param('id', new ParseUUIDPipe()) id: string,
	): Promise<GetItemDto | undefined> {
		const item = await this.service.getOneOrFail(id);
		return this.service.entityToDto(item);
	}

	@Delete(':id')
	async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
		return await this.service.delete(id);
	}
}
