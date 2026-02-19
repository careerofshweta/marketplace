import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {

  @ApiProperty({ example: "Cars" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "car-icon.png" })
  icon: string;
}
