import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, ObjectID, Repository } from 'typeorm';
import { CreateItemDto } from './dto/CreateItem.dto';
import { GetItemDto } from './dto/getItem.dto';
import { Item } from './item.entity';

export class ItemService {
  constructor(
    @InjectRepository(Item)
    private repo: Repository<Item>,
  ) {}

  public getOneOrFail = async (id: string) => {
    const item = await this.repo.findOne(id);

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    } else return item;
  };

  public getAll = async (userId: string) => {
    return await this.repo.find({
      where: { user: userId },
      relations: ['user'],
    });
  };

  public create = async (item: CreateItemDto) => {
    return await this.repo.save(item);
  };

  public delete = async (id: string) => {
    return await this.repo.delete(id);
  };

  public update = async (item: DeepPartial<Item> & { id: string }) => {
    return await this.repo.save(item);
  };

  public entityToDto = (entity: Item): GetItemDto => {
    return {
      ...entity,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    };
  };
}
