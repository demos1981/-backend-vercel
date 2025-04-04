"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const data_source_1 = require("../config/data-source");
const Item_entity_1 = require("../models/Item.entity");
class ItemService {
    constructor() {
        this.itemRepository = data_source_1.AppDataSource.getRepository(Item_entity_1.Item);
    }
    async create(createItemDto) {
        const item = this.itemRepository.create(createItemDto);
        return this.itemRepository.save(item);
    }
    async findAll() {
        return this.itemRepository.find();
    }
    async findById(id) {
        return this.itemRepository.findOneBy({ id });
    }
    async update(id, updateItemDto) {
        const item = await this.findById(id);
        if (!item)
            return null;
        const cleanUpdateDto = Object.entries(updateItemDto).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {});
        this.itemRepository.merge(item, cleanUpdateDto);
        return this.itemRepository.save(item);
    }
    async remove(id) {
        const result = await this.itemRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map