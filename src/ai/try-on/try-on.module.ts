import { Module } from '@nestjs/common';
import { VertexModule } from '@/ai/vertex/vertex.module';
import { TryOnController } from '@/ai/try-on/try-on.controller';
import { TryOnService } from '@/ai/try-on/try-on.service';

@Module({
  imports: [VertexModule],
  controllers: [TryOnController],
  providers: [TryOnService],
})
export class TryOnModule {}
