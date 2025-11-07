import { BadRequestException, Injectable } from '@nestjs/common';

import { AzureBlobService } from '@/azure/azure-blob.service';

@Injectable()
export class MediaService {
  constructor(private readonly _azureBlobService: AzureBlobService) {}

  getCategoryUploadUrl(categoryId: string, mimeType: string) {
    if (!mimeType.startsWith('image/'))
      throw new BadRequestException('Only image uploads are allowed');

    const blobName = `category/${categoryId}`;

    // const categoryExists = await this._categoryService.findOne(categoryId);
    //
    // if (!categoryExists)
    //   throw new BadRequestException('Category does not exist');

    return this._azureBlobService.generateUploadUrl(blobName);
  }

  getCategoryReadUrl(categoryId: string): string {
    return this._azureBlobService.generateReadUrl(`category/${categoryId}`);
  }

  getProductUploadUrl(productId: string, order: number, mimeType: string) {
    if (!mimeType.startsWith('image/'))
      throw new BadRequestException('Only image uploads are allowed');

    const blobName = `product/${productId}/${order}.jpg`;
    return this._azureBlobService.generateUploadUrl(blobName);
  }

  getProductThumbnailUploadUrl(productId: string, mimeType: string) {
    if (!mimeType.startsWith('image/'))
      throw new BadRequestException('Only image uploads are allowed');
    const blobName = `product/${productId}/thumbnail.jpg`;
    return this._azureBlobService.generateUploadUrl(blobName);
  }

  async getProductImages(productId: string) {
    const prefix = `product/${productId}/`;
    const blobs = await this._azureBlobService.listBlobs(prefix);

    return blobs
      .filter((b) => b.match(/\/\d+\.jpg$/))
      .sort((a, b) => {
        const aOrder = parseInt(a.match(/(\d+)\.jpg$/)?.[1] ?? '0', 10);
        const bOrder = parseInt(b.match(/(\d+)\.jpg$/)?.[1] ?? '0', 10);
        return aOrder - bOrder;
      })
      .map((b) => this._azureBlobService.generateReadUrl(b));
  }

  getProductThumbnail(productId: string) {
    const blobName = `product/${productId}/thumbnail.jpg`;

    return this._azureBlobService.generateReadUrl(blobName);
  }
}
