import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateItemDto } from './dto/CreateItem.dto';
import { GetItemDto } from './dto/getItem.dto';

import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(@Inject(ItemService) private service: ItemService) {}

  @Get()
  async getItems(): // @Param('userId', new ParseUUIDPipe()) userId: string,
  Promise<GetItemDto[]> {
    const items = await this.service.getAll();
    return items.map(this.service.entityToDto);
  }

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
}
