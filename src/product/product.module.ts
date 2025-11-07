import { Module } from '@nestjs/common';

import { MediaModule } from '@/media/media.module';
import { ProductService } from '@/product/product.service';
import { ProductController } from '@/product/product.controller';
import { CategoryModule } from '@/product/category/category.module';
import { PrismaProductRepository } from '@/product/repositories/prisma-product.repository';
import { VariantModule } from '@/product/variant/variant.module';

@Module({
  imports: [MediaModule, CategoryModule, VariantModule],
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
