export enum ItemStatusEnum {
  NEW = "new",
  STOCK = "stock",
}

export enum ItemSexEnum {
  MAN = "man",
  WOMAN = "woman",
  CHILDREN = "children",
  UNISEX = "unisex",
}

export interface IItem {
  id: number;
  articles: string;
  brand: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  barcode: string;
  color: string;
  size: string;
  role: ItemStatusEnum;
  sex: ItemSexEnum;
  category: string;
  photoUrl?: string;
  videoUrl?: string;
}

export interface ICreateItemDto {
  articles: string;
  brand: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  barcode: string;
  color: string;
  size: string;
  role: ItemStatusEnum;
  sex: ItemSexEnum;
  category: string;
}

export interface IUpdateItemDto {
  articles?: string;
  brand?: string;
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  barcode?: string;
  color?: string;
  size?: string;
  role?: ItemStatusEnum;
  sex?: ItemSexEnum;
  category?: string;
  photoUrl?: string;
  videoUrl?: string;
}
