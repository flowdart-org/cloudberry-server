import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
  SASProtocol,
} from '@azure/storage-blob';

@Injectable()
export class AzureBlobService {
  private readonly accountName: string;
  private readonly accountKey: string;
  private readonly containerName: string;

  private readonly sharedKeyCredential: StorageSharedKeyCredential;
  private readonly blobServiceClient: BlobServiceClient;

  constructor() {
    const configService = new ConfigService();
    this.accountName = configService.getOrThrow<string>(
      'AZURE_STORAGE_ACCOUNT',
    );
    this.accountKey = configService.getOrThrow<string>('AZURE_STORAGE_KEY');
    this.containerName = configService.getOrThrow<string>(
      'AZURE_STORAGE_CONTAINER',
    );

    this.sharedKeyCredential = new StorageSharedKeyCredential(
      this.accountName,
      this.accountKey,
    );

    this.blobServiceClient = new BlobServiceClient(
      `https://${this.accountName}.blob.core.windows.net`,
      this.sharedKeyCredential,
    );
  }

  generateUploadUrl(blobName: string): string {
    const expiresOn = new Date(Date.now() + 15 * 60 * 1000);
    const permissions = BlobSASPermissions.parse('cw');

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName: this.containerName,
        blobName: blobName,
        permissions,
        expiresOn,
      },
      this.sharedKeyCredential,
    ).toString();

    return `https://${this.accountName}.blob.core.windows.net/${this.containerName}/${blobName}?${sasToken}`;
  }

  generateReadUrl(blobName: string): string {
    const expiresOn = new Date(Date.now() + 15 * 60 * 1000);
    const permissions = BlobSASPermissions.parse('r');

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName: this.containerName,
        blobName: blobName,
        permissions,
        expiresOn,
        protocol: SASProtocol.Https,
      },
      this.sharedKeyCredential,
    ).toString();

    return `https://${this.accountName}.blob.core.windows.net/${this.containerName}/${blobName}?${sasToken}`;
  }
}
