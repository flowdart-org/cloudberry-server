import { Module } from '@nestjs/common';

import { MediaModule } from '@/media/media.module';
import { ProductService } from '@/product/product.service';
import { VariantModule } from '@/product/variant/variant.module';
import { ProductController } from '@/product/product.controller';
import { CategoryModule } from '@/product/category/category.module';
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
