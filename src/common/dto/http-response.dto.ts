import { ApiProperty } from '@nestjs/swagger';
import { HTTP_RESPONSE } from '@/common/types';

export class HttpResponse<T = any> implements HTTP_RESPONSE {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User registered successfully' })
  message: string;

  @ApiProperty({ required: false })
  data?: T;
}
