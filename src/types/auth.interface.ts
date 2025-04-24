import { Request } from "express";
import { User } from "../models/user.entity";

export interface RequestWithUser extends Request {
  user: User;
}

export interface DataStoredInToken {
  id: number;
  role: string;
  email: string;
}
export interface DataUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
