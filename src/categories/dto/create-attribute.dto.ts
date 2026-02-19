import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateAttributeDto {

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: "brand" })
  @IsNotEmpty()
  fieldName: string;

  @ApiProperty({ example: ["Honda", "Toyota"] })
  @IsArray()
  options: string[];
}
