import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';

export class CategoryPaginatedQueryDto extends PaginatedQueryDto {
  @ApiProperty({ required: false, example: 'shirts' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    required: false,
    example: 'active',
    enum: ['active', 'inactive'],
  })
  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
