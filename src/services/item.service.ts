import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Item } from "../models/Item.entity";
import { ICreateItemDto, IUpdateItemDto } from "../types/item.types";

export class ItemService {
  private itemRepository: Repository<Item>;

  constructor() {
    this.itemRepository = AppDataSource.getRepository(Item);
  }

  async create(createItemDto: ICreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findById(id: number): Promise<Item | null> {
    return this.itemRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateItemDto: IUpdateItemDto
  ): Promise<Item | null> {
    const item = await this.findById(id);
    if (!item) return null;

    // Remove null values and convert to DeepPartial<Item>
    const cleanUpdateDto = Object.entries(updateItemDto).reduce(
      (acc, [key, value]) => {
        if (value !== null) {
          acc[key as keyof Item] = value;
        }
        return acc;
      },
      {} as Partial<Item>
    );

    this.itemRepository.merge(item, cleanUpdateDto);
    return this.itemRepository.save(item);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.itemRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
