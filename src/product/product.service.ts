import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { CategoryService } from '@/product/category/category.service';
import { CreateProductDto } from '@/product/dto/request/create-product.dto';
import { UpdateProductDto } from '@/product/dto/request/update-product.dto';
import { ProductResponseDto } from '@/product/dto/response/product-response.dto';
import type { ProductRepository } from '@/product/repositories/interfaces/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly _productRepository: ProductRepository,
    private readonly _categoryService: CategoryService,
  ) {}

  async create(dto: CreateProductDto) {
    const category = await this._categoryService.findOne(dto.categoryId);
    if (!category) throw new BadRequestException('Category not found');

    return this._productRepository.create({
      ...dto,
      category,
      discountPercentage: dto.discountPercent || 0,
    });
  }

  async findAll() {
    const docs = await this._productRepository.findAll();
    return docs.length
      ? Promise.all(
          docs.map(async (p) => {
            const category = await this._categoryService.findOne(p.category.id);
            return new ProductResponseDto(p, category, []);
          }),
        )
      : [];
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }

  update(id: string, dto: UpdateProductDto) {
    // return this._productRepository.update(id, {
    //   ...dto,
    //   variants: dto.variants ? dto.variants : [],
    // });
  }
}
