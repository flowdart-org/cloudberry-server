import { Module } from '@nestjs/common';
import { VertexService } from '@/ai/vertex/vertex.service';

@Module({
  providers: [VertexService],
  exports: [VertexService],
})
export class VertexModule {}
