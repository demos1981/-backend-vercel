import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsOptional()
  public password: string;
}
