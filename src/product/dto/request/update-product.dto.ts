import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNumber({}, { message: 'ID must be a number' })
  @ApiProperty({
    example: 'product123',
    description: 'ID of the product to update',
  })
  id: string;
}
