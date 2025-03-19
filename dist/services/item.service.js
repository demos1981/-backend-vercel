"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const data_source_1 = require("../config/data-source");
const Item_entity_1 = require("../models/Item.entity");
class ItemService {
    constructor() {
        this.itemRepository = data_source_1.AppDataSource.getRepository(Item_entity_1.Item);
    }
    async findAll() {
        return this.itemRepository.find();
    }
    async findById(id) {
        return this.itemRepository.findOneBy({ id });
    }
    async create(createItemDto) {
        const item = this.itemRepository.create(createItemDto);
        return this.itemRepository.save(item);
    }
    async update(id, updateItemDto) {
        const item = await this.findById(id);
        if (!item)
            return null;
        this.itemRepository.merge(item, updateItemDto);
        return this.itemRepository.save(item);
    }
    async delete(id) {
        const item = await this.findById(id);
        if (!item)
            return false;
        await this.itemRepository.remove(item);
        return true;
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map