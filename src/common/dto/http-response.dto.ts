import { ApiProperty } from '@nestjs/swagger';
import { HTTP_PAGINATED_RESPONSE, HTTP_RESPONSE } from '@/common/types';

export class HttpResponse<T> implements HTTP_RESPONSE {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Response sent successfully' })
  message: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ required: false })
  accessToken?: string;
}

export class HttpPaginatedResponse<T>
  extends HttpResponse<T>
  implements HTTP_PAGINATED_RESPONSE
{
  @ApiProperty({
    example: 10,
  })
  total?: number;

  @ApiProperty({
    example: 10,
  })
  limit?: number;

  @ApiProperty({
    example: 1,
  })
  page?: number;
}
