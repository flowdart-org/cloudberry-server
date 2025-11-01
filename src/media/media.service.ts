import { BadRequestException, Injectable } from '@nestjs/common';

import { AzureBlobService } from '@/azure/azure-blob.service';

@Injectable()
export class MediaService {
  constructor(private readonly _azureBlobService: AzureBlobService) {}
  // getCategoryUploadUrl(
  //   categoryId: string,
  //   fileName: string,
  //   mimeType: string,
  // ): {
  //   uploadUrl: string;
  //   publicUrl: string;
  // } {
  //   if (!mimeType.startsWith('image/')) {
  //     throw new BadRequestException('Only image uploads are allowed');
  //   }
  //   return {
  //     uploadUrl: this._azureBlobService.generateUploadUrl(
  //       `category/${categoryId}`,
  //     ),
  //     publicUrl: this._azureBlobService.generateReadUrl(
  //       `category/${categoryId}`,
  //     ),
  //   };
  // }

  getCategoryUploadUrl(categoryId: string, mimeType: string) {
    if (!mimeType.startsWith('image/'))
      throw new BadRequestException('Only image uploads are allowed');

    const blobName = `category/${categoryId}`;

    return this._azureBlobService.generateUploadUrl(blobName);
  }

  getProductUploadUrl(productId: string, mimeType: string) {
    if (!mimeType.startsWith('image/'))
      throw new BadRequestException('Only image uploads are allowed');

    const blobName = `product/${productId}`;

    return this._azureBlobService.generateUploadUrl(blobName);
  }

  getCategoryReadUrl(categoryId: string): string {
    return this._azureBlobService.generateReadUrl(`category/${categoryId}`);
  }

  getPublicUrl(path: string): string {
    return this._azureBlobService.generateReadUrl(path);
  }
}
