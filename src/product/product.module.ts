import { Module } from '@nestjs/common';

import { ProductService } from '@/product/product.service';
import { ProductController } from '@/product/product.controller';
import { CategoryModule } from '@/product/category/category.module';
import { PrismaProductRepository } from '@/product/repositories/prisma-product.repository';

@Module({
  imports: [CategoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: 'ProductRepository',
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductModule {}
