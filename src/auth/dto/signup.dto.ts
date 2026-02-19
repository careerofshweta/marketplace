import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class SignupDto {

  @ApiProperty({ example: "shweta verma" })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: "abc@gmail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "11122233" })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "11122233" })
  @MinLength(6)
  confirmPassword: string;
}
