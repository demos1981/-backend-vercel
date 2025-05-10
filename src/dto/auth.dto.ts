import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { UserRole } from "../types/enums";

export class RegisterUserDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  public role: UserRole;
}
