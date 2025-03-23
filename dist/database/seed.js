"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const data_source_1 = require("../config/data-source");
const Item_entity_1 = require("../models/Item.entity");
const item_types_1 = require("../types/item.types");
const sampleItems = [
    {
        articles: "T-Shirt",
        brand: "Nike",
        name: "Classic T-Shirt",
        description: "Comfortable cotton t-shirt for everyday wear",
        quantity: 100,
        price: 29.99,
        barcode: 123456789,
        color: "Black",
        size: "M",
        role: item_types_1.ItemStatusEnum.NEW,
        sex: item_types_1.ItemSexEnum.UNISEX,
        category: "Clothing",
    },
    {
        articles: "Jeans",
        brand: "Levi's",
        name: "Slim Fit Jeans",
        description: "Classic slim fit denim jeans",
        quantity: 50,
        price: 79.99,
        barcode: 987654321,
        color: "Blue",
        size: "32",
        role: item_types_1.ItemStatusEnum.STOCk,
        sex: item_types_1.ItemSexEnum.MAN,
        category: "Pants",
    },
    {
        articles: "Dress",
        brand: "Zara",
        name: "Summer Floral Dress",
        description: "Light and breezy floral dress perfect for summer",
        quantity: 30,
        price: 89.99,
        barcode: 456789123,
        color: "White",
        size: "S",
        role: item_types_1.ItemStatusEnum.NEW,
        sex: item_types_1.ItemSexEnum.WOMAN,
        category: "Dresses",
    },
    {
        articles: "Shoes",
        brand: "Adidas",
        name: "Running Shoes",
        description: "Comfortable running shoes with cushioning",
        quantity: 75,
        price: 129.99,
        barcode: 789123456,
        color: "White",
        size: "42",
        role: item_types_1.ItemStatusEnum.STOCk,
        sex: item_types_1.ItemSexEnum.UNISEX,
        category: "Footwear",
    },
    {
        articles: "Jacket",
        brand: "The North Face",
        name: "Winter Jacket",
        description: "Warm and waterproof winter jacket",
        quantity: 40,
        price: 199.99,
        barcode: 321654987,
        color: "Black",
        size: "L",
        role: item_types_1.ItemStatusEnum.NEW,
        sex: item_types_1.ItemSexEnum.UNISEX,
        category: "Outerwear",
    },
    {
        articles: "Sweater",
        brand: "H&M",
        name: "Kids Sweater",
        description: "Cozy sweater for children",
        quantity: 60,
        price: 39.99,
        barcode: 147258369,
        color: "Red",
        size: "8",
        role: item_types_1.ItemStatusEnum.STOCk,
        sex: item_types_1.ItemSexEnum.CHILDREN,
        category: "Kids",
    },
];
async function seedDatabase() {
    try {
        const itemRepository = data_source_1.AppDataSource.getRepository(Item_entity_1.Item);
        await itemRepository.clear();
        for (const item of sampleItems) {
            const newItem = itemRepository.create(item);
            await itemRepository.save(newItem);
        }
        console.log("Database seeded successfully!");
    }
    catch (error) {
        console.error("Error seeding database:", error);
        throw error;
    }
}
exports.seedDatabase = seedDatabase;
if (require.main === module) {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
        return seedDatabase();
    })
        .catch((error) => {
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=seed.js.map