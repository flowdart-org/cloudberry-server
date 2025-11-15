import { Module } from '@nestjs/common';
import { UserModule } from '@/user/user.module';
import { MediaModule } from '@/media/media.module';
import { ProductModule } from '@/product/product.module';
import { VertexModule } from '@/ai/vertex/vertex.module';
import { TryOnService } from '@/ai/try-on/try-on.service';
import { TryOnController } from '@/ai/try-on/try-on.controller';

@Module({
  imports: [VertexModule, UserModule, ProductModule, MediaModule],
  controllers: [TryOnController],
  providers: [TryOnService],
})
export class TryOnModule {}
