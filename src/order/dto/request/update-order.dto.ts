import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({ required: false, description: 'The status of the order' })
  status?: 'pending' | 'processing' | 'shipping' | 'delivered' | 'canceled';
}
