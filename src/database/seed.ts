import "reflect-metadata";
import { AppDataSource } from "../config/data-source";
import { Item } from "../models/itemEntity";
import { ItemStatusEnum, ItemSexEnum } from "../types/enums";

const sampleItems = [
  {
    articles: "T-Shirt",
    brand: "Nike",
    name: "Classic T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    quantity: 100,
    price: 2999,
    barcode: "123456789",
    color: "Black",
    size: "M",
    role: ItemStatusEnum.NEW,
    sex: ItemSexEnum.UNISEX,
    category: "Clothing",
  },
  {
    articles: "Jeans",
    brand: "Levi's",
    name: "Slim Fit Jeans",
    description: "Classic slim fit denim jeans",
    quantity: 50,
    price: 7999,
    barcode: "987654321",
    color: "Blue",
    size: "32",
    role: ItemStatusEnum.STOCK,
    sex: ItemSexEnum.MAN,
    category: "Pants",
  },
  {
    articles: "Dress",
    brand: "Zara",
    name: "Summer Floral Dress",
    description: "Light and breezy floral dress perfect for summer",
    quantity: 30,
    price: 8999,
    barcode: "456789123",
    color: "White",
    size: "S",
    role: ItemStatusEnum.NEW,
    sex: ItemSexEnum.WOMAN,
    category: "Dresses",
  },
  {
    articles: "Shoes",
    brand: "Adidas",
    name: "Running Shoes",
    description: "Comfortable running shoes with cushioning",
    quantity: 75,
    price: 12999,
    barcode: "789123456",
    color: "White",
    size: "42",
    role: ItemStatusEnum.STOCK,
    sex: ItemSexEnum.UNISEX,
    category: "Footwear",
  },
  {
    articles: "Jacket",
    brand: "The North Face",
    name: "Winter Jacket",
    description: "Warm and waterproof winter jacket",
    quantity: 40,
    price: 19999,
    barcode: "321654987",
    color: "Black",
    size: "L",
    role: ItemStatusEnum.NEW,
    sex: ItemSexEnum.UNISEX,
    category: "Outerwear",
  },
  {
    articles: "Sweater",
    brand: "H&M",
    name: "Kids Sweater",
    description: "Cozy sweater for children",
    quantity: 60,
    price: 3999,
    barcode: "147258369",
    color: "Red",
    size: "8",
    role: ItemStatusEnum.STOCK,
    sex: ItemSexEnum.CHILDREN,
    category: "Kids",
  },
];

export async function seedDatabase() {
  try {
    const itemRepository = AppDataSource.getRepository(Item);

    // Clear existing data
    await itemRepository.clear();

    // Insert sample items
    for (const item of sampleItems) {
      const newItem = itemRepository.create(item);
      await itemRepository.save(newItem);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run the seed function if this file is executed directly
if (require.main === module) {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
      return seedDatabase();
    })
    .catch((error) => {
      console.error("Error during Data Source initialization:", error);
      process.exit(1);
    });
}
