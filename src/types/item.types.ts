export interface IItem {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateItemDto {
  name: string;
  description?: string;
}

export interface IUpdateItemDto {
  name?: string;
  description?: string;
}
