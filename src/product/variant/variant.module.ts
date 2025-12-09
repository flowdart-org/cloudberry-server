import { Module } from '@nestjs/common';

import { PrismaVariantRepository } from '@/product/variant/repositories/prisma-variant.repository';
import { VariantService } from '@/product/variant/variant.service';

@Module({
  providers: [
    { provide: 'VariantRepository', useClass: PrismaVariantRepository },
    VariantService,
  ],
  exports: [VariantService],
})
export class VariantModule {}
