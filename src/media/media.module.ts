import { Module } from '@nestjs/common';

import { AzureModule } from '@/azure/azure.module';
import { MediaService } from '@/media/media.service';
import { MediaController } from '@/media/media.controller';

@Module({
  imports: [AzureModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
