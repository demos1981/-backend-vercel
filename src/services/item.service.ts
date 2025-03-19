import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Item } from "../models/Item.entity";
import { ICreateItemDto, IUpdateItemDto } from "../types/item.types";

export class ItemService {
  private itemRepository: Repository<Item>;

  constructor() {
    this.itemRepository = AppDataSource.getRepository(Item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findById(id: number): Promise<Item | null> {
    return this.itemRepository.findOneBy({ id });
  }

  async create(createItemDto: ICreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async update(
    id: number,
    updateItemDto: IUpdateItemDto
  ): Promise<Item | null> {
    const item = await this.findById(id);
    if (!item) return null;

    this.itemRepository.merge(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  async delete(id: number): Promise<boolean> {
    const item = await this.findById(id);
    if (!item) return false;

    await this.itemRepository.remove(item);
    return true;
  }
}
