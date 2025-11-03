import { Controller, Get, Param, Query } from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import type { HTTP_RESPONSE } from '@/common/types';
import { MediaService } from '@/media/media.service';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('media')
export class MediaController {
  constructor(private readonly _mediaService: MediaService) {}

  @Get('/upload/category/:categoryId')
  @Roles(Role.ADMIN)
  getCategoryUploadUrl(
    @Param('categoryId') categoryId: string,
    @Query('fileName') fileName: string,
    @Query('mimeType') mimeType: string,
  ): HTTP_RESPONSE<string> {
    return {
      data: this._mediaService.getCategoryUploadUrl(categoryId, mimeType),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/product/:productId')
  @Roles(Role.ADMIN)
  getProductUploadUrl(
    @Param('productId') productId: string,
    @Query('fileName') fileName: string,
    @Query('mimeType') mimeType: string,
  ): HTTP_RESPONSE<string> {
    return {
      data: this._mediaService.getProductUploadUrl(productId, mimeType),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  // @Delete()
  // remove(@Param('id') id: string) {
  //   return this.mediaService.remove(+id);
  // }
}
