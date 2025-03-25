import { ItemStatusEnum, ItemSexEnum } from "../types/enums";

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
  documentUrl?: string;
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
  photoUrl?: string;
  videoUrl?: string;
  documentUrl?: string;
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
  photoUrl?: string | null;
  videoUrl?: string | null;
  documentUrl?: string | null;
}

export interface IItemResponse {
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
  documentUrl?: string;
  created_at: Date;
  updated_at: Date;
}
