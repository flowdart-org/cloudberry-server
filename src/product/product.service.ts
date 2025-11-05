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

  async create(dto: CreateProductDto): Promise<ProductResponseDto> {
    const category = await this._categoryService.findOne(dto.categoryId);
    if (!category) throw new BadRequestException('Category not found');

    const doc = await this._productRepository.create({
      ...dto,
      category,
      discountPercent: dto.discountPercent || 0,
      variants: [],
    });

    return new ProductResponseDto(doc, category, []);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const docs = await this._productRepository.findAll();
    console.log(docs);

    return docs.length
      ? Promise.all(
          docs.map(async (p) => {
            const category = await this._categoryService.findOne(p.category.id);
            return new ProductResponseDto(p, category, []);
          }),
        )
      : [];
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const doc = await this._productRepository.findById(id);

    if (!doc) throw new BadRequestException('Product not found');

    return new ProductResponseDto(doc, doc.category, []);
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const doc = await this._productRepository.update(id, {
      ...dto,
      variants: [],
    });

    return new ProductResponseDto(doc, doc.category, []);
  }
}
