"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
const data_source_1 = require("../config/data-source");
const itemEntity_1 = require("../models/itemEntity");
const enums_1 = require("../types/enums");
class ItemService {
    constructor() {
        this.itemRepository = data_source_1.AppDataSource.getRepository(itemEntity_1.Item);
    }
    async create(createItemDto) {
        const item = this.itemRepository.create(createItemDto);
        return this.itemRepository.save(item);
    }
    async findAll() {
        return this.itemRepository.find();
    }
    async findMenItems() {
        return this.itemRepository.find({
            where: { sex: enums_1.ItemSexEnum.MAN },
        });
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
    async getItemMedia(id) {
        const item = await this.itemRepository.findOneBy({ id });
        if (!item)
            return null;
        return {
            photoUrl: item.photoUrl || null,
            videoUrl: item.videoUrl || null,
        };
    }
    async remove(id) {
        const result = await this.itemRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map