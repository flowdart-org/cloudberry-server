import { Controller, Get, Param } from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import { Roles } from '@/common/decorators/roles.decorator';
import { HttpResponse } from '@/common/dto/http-response.dto';
import { MediaService } from '@/media/services/media.service';
import { UserId } from '@/common/decorators/user-id.decorator';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { UploadMediaResponseDto } from '@/media/dto/response/upload-media.response.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly _mediaService: MediaService) {}

  @Get('/upload/category/:categoryId')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UploadMediaResponseDto)
  getCategoryUploadUrl(
    @Param('categoryId') categoryId: string,
  ): HttpResponse<UploadMediaResponseDto> {
    const data = this._mediaService.getCategoryUploadUrl(categoryId);

    return {
      data: new UploadMediaResponseDto(data),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/product/:productId/thumbnail')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UploadMediaResponseDto)
  getProductThumbnailUploadUrl(
    @Param('productId') productId: string,
  ): HttpResponse<UploadMediaResponseDto> {
    const data = this._mediaService.getProductThumbnailUploadUrl(productId);

    return {
      data: new UploadMediaResponseDto(data),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/product/:productId/:order')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UploadMediaResponseDto)
  getProductUploadUrl(
    @Param('productId') productId: string,
    @Param('order') order: number,
  ): HttpResponse<UploadMediaResponseDto> {
    const data = this._mediaService.getProductUploadUrl(productId, order);

    return {
      data: new UploadMediaResponseDto(data),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/user/try-on')
  @Roles(Role.USER)
  @ApiResponseWithType({}, UploadMediaResponseDto)
  getUserTryOnUploadUrl(
    @UserId() userId: string,
  ): HttpResponse<UploadMediaResponseDto> {
    const data = this._mediaService.getUserTryOnUploadUrl(userId);

    return {
      data: new UploadMediaResponseDto(data),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }

  @Get('/upload/hero-image')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UploadMediaResponseDto)
  getHeroImageUploadUrl(): HttpResponse<UploadMediaResponseDto> {
    const data = this._mediaService.getHeroImageUploadUrl();

    return {
      data: new UploadMediaResponseDto(data),
      message: 'Upload URL generated successfully',
      success: true,
    };
  }
}
