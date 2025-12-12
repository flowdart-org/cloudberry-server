import { IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    example: 'processing',
    description: 'The status of the order',
  })
  @IsString({
    message: 'Status must be a string',
  })
  @IsEnum(['pending', 'processing', 'shipping', 'delivered', 'canceled'], {
    message:
      'Status must be one of: pending, processing, shipping, delivered, canceled',
  })
  status?: 'pending' | 'processing' | 'shipping' | 'delivered' | 'canceled';
}
