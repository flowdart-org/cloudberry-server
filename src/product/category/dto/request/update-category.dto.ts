import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryDto } from '@/product/category/dto/request/create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    required: false,
    description: 'Status of the category',
    enum: ['active', 'inactive'],
    example: 'active',
  })
  @IsOptional()
  @IsEnum(['active', 'inactive'], {
    message: 'Status must be either active or inactive',
  })
  status?: 'active' | 'inactive';
}
