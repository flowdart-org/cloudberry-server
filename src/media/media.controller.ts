import { Controller, Get, Param, Query } from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import type { HTTP_RESPONSE } from '@/common/types';
import { MediaService } from '@/media/media.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserId } from '@/common/decorators/user-id.decorator';

@Controller('media')
export class MediaController {
  constructor(private readonly _mediaService: MediaService) {}

  @Get('/upload/category/:categoryId')
  @Roles(Role.ADMIN)
  getCategoryUploadUrl(
    @Param('categoryId') categoryId: string,
    @Query('mimeType') mimeType: string,
  ): HTTP_RESPONSE<string> {
    return {
      data: this._mediaService.getCategoryUploadUrl(categoryId, mimeType),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/product/:productId/thumbnail')
  @Roles(Role.ADMIN)
  getProductThumbnailUploadUrl(
    @Param('productId') productId: string,
    @Query('mimeType') mimeType: string,
  ): HTTP_RESPONSE<string> {
    const data = this._mediaService.getProductThumbnailUploadUrl(
      productId,
      mimeType,
    );

    return {
      data,
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/product/:productId/:order')
  @Roles(Role.ADMIN)
  getProductUploadUrl(
    @Param('productId') productId: string,
    @Param('order') order: number,
    @Query('mimeType') mimeType: string,
  ): HTTP_RESPONSE<string> {
    return {
      data: this._mediaService.getProductUploadUrl(productId, order, mimeType),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/user/try-on')
  @Roles(Role.USER)
  getUserTryOnUploadUrl(
    @Query('mimeType') mimeType: string,
    @UserId() userId: string,
  ): HTTP_RESPONSE<string> {
    return {
      data: this._mediaService.getUserTryOnUploadUrl(userId, mimeType),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  // @Delete()
  // remove(@Param('id') id: string) {
  //   return this.mediaService.remove(+id);
  // }
}
