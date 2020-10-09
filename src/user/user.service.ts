import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/item.entity';

import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { GetUserDto } from './dto/GetUser.dto';
import { User } from './user.entity';

export class UserService {
	constructor(
		@InjectRepository(User)
		private userDB: Repository<User>,
		@InjectRepository(Item)
		private itemDB: Repository<Item>,
	) {}

	create = async (user: CreateUserDto) => {
		return this.userDB.save(user);
	};

	getOneOrFail = async (id: string) => {
		const user = await this.userDB.findOne(id);
		if (!user) {
			throw new NotFoundException();
		}
		return user;
	};

	getItemsForUser = async (id: string) => {
		await this.getOneOrFail(id);
		const items = await this.itemDB.find({
			where: { user: id },
			relations: ['user'],
		});
		return items.map(item => ({
			...item,
			createdAt: item.createdAt.toISOString(),
			updatedAt: item.updatedAt.toISOString(),
		}));
	};

	public entityToDto = (entity: User): GetUserDto => {
		return {
			...entity,
			createdAt: entity.createdAt.toISOString(),
			updatedAt: entity.updatedAt.toISOString(),
		};
	};
}
