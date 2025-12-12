import { ApiProperty } from '@nestjs/swagger';

import { VariantDto } from '@/product/variant/dto/variant.dto';

export class ProductVariantResponseDto implements VariantDto {
  @ApiProperty({
    description: 'Unique identifier for the product variant',
    example: 'var_1234567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Size of the product variant',
    example: 'M',
  })
  size: string;

  @ApiProperty({
    description: 'Stock available for this variant',
    example: 100,
  })
  stock: number;
}
