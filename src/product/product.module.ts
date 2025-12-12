import { Module } from '@nestjs/common';

import { MediaModule } from '@/media/media.module';
import { VariantModule } from '@/product/variant/variant.module';
import { CategoryModule } from '@/product/category/category.module';
import { ProductService } from '@/product/services/product.service';
import { ProductController } from '@/product/controllers/product.controller';
import { PrismaProductRepository } from '@/product/repositories/prisma-product.repository';

@Module({
  imports: [MediaModule, VariantModule, CategoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
