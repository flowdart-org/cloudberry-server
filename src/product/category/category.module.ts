import { Module } from '@nestjs/common';

import { MediaModule } from '@/media/media.module';
import { CategoryService } from '@/product/category/category.service';
import { CategoryController } from '@/product/category/category.controller';
import { PrismaCategoryRepository } from '@/product/category/repositories/prisma-category.repository';

@Module({
  imports: [MediaModule],
  controllers: [CategoryController],
  providers: [
    {
      provide: 'CategoryRepository',
      useClass: PrismaCategoryRepository,
    },
    CategoryService,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
