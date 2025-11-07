import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { VariantService } from '@/product/variant/variant.service';
import { CategoryService } from '@/product/category/category.service';
import { CreateProductDto } from '@/product/dto/request/create-product.dto';
import { UpdateProductDto } from '@/product/dto/request/update-product.dto';
import { ProductResponseDto } from '@/product/dto/response/product-response.dto';
import type { ProductRepository } from '@/product/repositories/interfaces/product.repository';
import { MediaService } from '@/media/media.service';
import { Product } from '@/product/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly _productRepository: ProductRepository,
    private readonly _categoryService: CategoryService,
    private readonly _variantsService: VariantService,
    private readonly _mediaService: MediaService,
  ) {}

  private _toProductResponseDto = async (
    product: Product,
  ): Promise<ProductResponseDto> => {
    const category = await this._categoryService.findOne(product.category.id);
    const images = await this._mediaService.getProductImages(product.id);
    const thumbnail = this._mediaService.getProductThumbnail(product.id);
    return new ProductResponseDto(product, category, images, thumbnail);
  };

  private _toProductsResponseDto = async (
    products: Product[],
  ): Promise<ProductResponseDto[]> => {
    return Promise.all(
      products.map(async (p) => {
        return await this._toProductResponseDto(p);
      }),
    );
  };

  async create(dto: CreateProductDto): Promise<ProductResponseDto> {
    const category = await this._categoryService.findOne(dto.categoryId);
    if (!category) throw new BadRequestException('Category not found');

    const createdProduct = await this._productRepository.create({
      ...dto,
      category,
      discountPercent: dto.discountPercent || 0,
    });

    if (dto.variants && dto.variants.length) {
      await this._variantsService.createOrUpdateMany(
        createdProduct.id,
        dto.variants,
      );
    }

    const doc = await this._productRepository.findById(createdProduct.id);

    if (!doc) throw new BadRequestException('Error creating product');

    return new ProductResponseDto(doc, category, []);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const docs = await this._productRepository.findAll();

    return docs.length ? this._toProductsResponseDto(docs) : [];
  }

  async findFeed(): Promise<ProductResponseDto[]> {
    const docs = await this._productRepository.findAllActive();

    return docs.length ? this._toProductsResponseDto(docs) : [];
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const doc = await this._productRepository.findById(id);

    if (!doc) throw new BadRequestException('Product not found');

    return this._toProductResponseDto(doc);
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const doc = await this._productRepository.update(id, dto);

    await this._variantsService.createOrUpdateMany(id, doc.variants);

    const product = await this._productRepository.findById(doc.id);

    if (!product) throw new BadRequestException('Product not found');

    return this._toProductResponseDto(product);
  }
}
