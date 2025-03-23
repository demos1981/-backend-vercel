export interface IItem {
  id: number;
  articles: string;
  brand: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  barcode: number;
  color: string;
  size: string;
  role: ItemStatusEnum;
  sex: ItemSexEnum;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateItemDto {
  articles: string;
  brand: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  barcode: number;
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
  barcode?: number;
  color?: string;
  size?: string;
  role?: ItemStatusEnum;
  sex?: ItemSexEnum;
  category?: string;
}

export enum ItemStatusEnum {
  NEW = "new",
  STOCk = "stock",
}

export enum ItemSexEnum {
  MAN = "man",
  WOMAN = "woman",
  CHILDREN = "children",
  UNISEX = "unisex",
}
