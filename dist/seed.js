"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const item_service_1 = require("./services/item.service");
const seedDatabase = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Connected to database");
        const itemService = new item_service_1.ItemService();
        const sampleItems = [
            {
                name: "First Item",
                description: "This is the first sample item",
            },
            {
                name: "Second Item",
                description: "This is the second sample item",
            },
            {
                name: "Third Item",
                description: "This is the third sample item",
            },
            {
                name: "Fourth Item",
                description: "This is the fourth sample item",
            },
            {
                name: "Fifth Item",
                description: "This is the fifth sample item",
            },
        ];
        for (const itemData of sampleItems) {
            const item = await itemService.create(itemData);
            console.log(`Created item: ${item.name}`);
        }
        console.log("Database seeding completed successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};
seedDatabase();
//# sourceMappingURL=seed.js.map