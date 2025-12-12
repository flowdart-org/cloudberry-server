import { ApiProperty } from '@nestjs/swagger';

import { CategoryDto } from '@/product/category/dto/category.dto';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'cat_1234567890',
    description: 'Unique identifier for the category',
  })
  public id: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'Name of the category',
  })
  public name: string;

  @ApiProperty({
    example: 'active',
    description: 'Status of the category',
    enum: ['active', 'inactive'],
  })
  public status: 'active' | 'inactive';

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: 'Thumbnail image URL for the category',
  })
  public thumbnail: string;

  static fromDto(this: void, entity: CategoryDto): CategoryResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      status: entity.status,
      thumbnail: entity.thumbnail,
    };
  }
}
