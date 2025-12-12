import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VariantDto {
  @ApiPropertyOptional({
    example: 'var123',
    description: 'ID of the variant',
    required: false,
  })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'M',
    description: 'Size of the variant',
  })
  @IsString()
  size: string;

  @ApiProperty({
    example: 15,
    description: 'Available stock for the variant',
  })
  @Type(() => Number)
  @IsNumber()
  stock: number;
}
