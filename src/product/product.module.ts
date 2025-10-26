import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '@/product/category/category.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [CategoryModule],
})
export class ProductModule {}
