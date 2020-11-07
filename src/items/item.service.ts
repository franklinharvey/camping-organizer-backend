import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { DeepPartial, Repository } from 'typeorm';
import { CreateItemDto } from './dto/CreateItem.dto';
import { GetItemDto } from './dto/GetItem.dto';
import { Item } from './item.entity';

export class ItemService {
	constructor(
		@InjectRepository(Item)
		private itemDB: Repository<Item>,
		private userService: UserService,
	) {}

	public getOneOrFail = async (id: string) => {
		const item = await this.itemDB.findOne(id);

		if (!item) {
			throw new NotFoundException(`Item with id ${id} not found`);
		} else return item;
	};

	public create = async (item: CreateItemDto) => {
		await this.userService.getOneOrFail(item.userId);

		return await this.itemDB.save(item);
	};

	public delete = async (id: string) => {
		await this.itemDB.delete(id);
	};

	public update = async (item: DeepPartial<Item> & { id: string }) => {
		return await this.itemDB.save(item);
	};

	public entityToDto = (entity: Item): GetItemDto => {
		return {
			...entity,
			createdAt: entity.createdAt.toISOString(),
			updatedAt: entity.updatedAt.toISOString(),
		};
	};
}
