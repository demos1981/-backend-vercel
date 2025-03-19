import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { ItemService } from "./services/item.service";
import { ICreateItemDto } from "./types/item.types";

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database");

    const itemService = new ItemService();

    // Sample items to insert
    const sampleItems: ICreateItemDto[] = [
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

    // Create and save items
    for (const itemData of sampleItems) {
      const item = await itemService.create(itemData);
      console.log(`Created item: ${item.name}`);
    }

    console.log("Database seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
