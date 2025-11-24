import { Injectable } from '@nestjs/common';

import { AzureBlobService } from '@/azure/azure-blob.service';

interface UploadUrlResponse {
  uploadUrl: string;
  readUrl: string;
}

export interface ReadUrlResponse {
  readUrl: string;
}

@Injectable()
export class MediaService {
  constructor(private readonly _azureBlobService: AzureBlobService) {}

  getCategoryUploadUrl(categoryId: string): UploadUrlResponse {
    const blobName = `category/${categoryId}`;

    return {
      uploadUrl: this._azureBlobService.generateUploadUrl(blobName),
      readUrl: this._azureBlobService.generateReadUrl(blobName),
    };
  }

  getCategoryReadUrl(categoryId: string): ReadUrlResponse {
    return {
      readUrl: this._azureBlobService.generateReadUrl(`category/${categoryId}`),
    };
  }

  getProductUploadUrl(productId: string, order: number): UploadUrlResponse {
    const blobName = `product/${productId}/${order}.jpg`;

    return {
      uploadUrl: this._azureBlobService.generateUploadUrl(blobName),
      readUrl: this._azureBlobService.generateReadUrl(blobName),
    };
  }

  async getProductReadUrls(productId: string): Promise<UploadUrlResponse[]> {
    const prefix = `product/${productId}/`;
    const blobs = await this._azureBlobService.listBlobs(prefix);

    return blobs
      .filter((b) => b.match(/\/\d+\.jpg$/))
      .sort((a, b) => {
        const aOrder = parseInt(a.match(/(\d+)\.jpg$/)?.[1] ?? '0', 10);
        const bOrder = parseInt(b.match(/(\d+)\.jpg$/)?.[1] ?? '0', 10);
        return aOrder - bOrder;
      })
      .map((b) => {
        return {
          uploadUrl: this._azureBlobService.generateUploadUrl(b),
          readUrl: this._azureBlobService.generateReadUrl(b),
        };
      });
  }

  getProductThumbnailUploadUrl(productId: string): UploadUrlResponse {
    const blobName = `product/${productId}/thumbnail.jpg`;

    return {
      uploadUrl: this._azureBlobService.generateUploadUrl(blobName),
      readUrl: this._azureBlobService.generateReadUrl(blobName),
    };
  }

  getProductThumbnailReadUrl(productId: string): ReadUrlResponse {
    const blobName = `product/${productId}/thumbnail.jpg`;

    return {
      readUrl: this._azureBlobService.generateReadUrl(blobName),
    };
  }

  getUserTryOnUploadUrl(userId: string): UploadUrlResponse {
    const blobName = `user/${userId}/try-on.jpg`;
    return {
      uploadUrl: this._azureBlobService.generateUploadUrl(blobName),
      readUrl: this._azureBlobService.generateReadUrl(blobName),
    };
  }

  async getUserTryOnReadUrl(userId: string): Promise<ReadUrlResponse | null> {
    const blobName = `user/${userId}/try-on.jpg`;

    const exists = await this._azureBlobService.blobExists(blobName);

    if (!exists) {
      return null;
    }

    return {
      readUrl: this._azureBlobService.generateReadUrl(blobName),
    };
  }
}
