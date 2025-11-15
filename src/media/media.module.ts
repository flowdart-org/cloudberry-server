import { Module } from '@nestjs/common';

import { AzureModule } from '@/azure/azure.module';
import { MediaService } from '@/media/media.service';
import { MediaController } from '@/media/media.controller';
import { TryOnMediaService } from '@/media/tryon-upload.service';

@Module({
  imports: [AzureModule],
  controllers: [MediaController],
  providers: [MediaService, TryOnMediaService],
  exports: [MediaService, TryOnMediaService],
})
export class MediaModule {}
