import { Module } from '@nestjs/common';

import { AzureModule } from '@/azure/azure.module';
import { MediaService } from '@/media/services/media.service';
import { MediaController } from '@/media/controllers/media.controller';
import { TryOnMediaService } from '@/media/services/tryon-upload.service';

@Module({
  imports: [AzureModule],
  controllers: [MediaController],
  providers: [MediaService, TryOnMediaService],
  exports: [MediaService, TryOnMediaService],
})
export class MediaModule {}
