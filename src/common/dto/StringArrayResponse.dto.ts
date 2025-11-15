import { ApiProperty } from '@nestjs/swagger';
import { HTTP_RESPONSE } from '@/common/types';

export class StringArrayResponse implements HTTP_RESPONSE {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Response sent successfully' })
  message: string;

  @ApiProperty({ type: [String] })
  data: string[];
}
