import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { MediaService } from '@/media/media.service';
import { ProductDto } from '@/product/dto/product.dto';
import { Product } from '@/product/entities/product.entity';
import { VariantService } from '@/product/variant/variant.service';
import { CategoryService } from '@/product/category/category.service';
import { CreateProductDto } from '@/product/dto/request/create-product.dto';
import { UpdateProductDto } from '@/product/dto/request/update-product.dto';
import type { ProductRepository } from '@/product/repositories/interfaces/product.repository';
import { ProductPaginatedQueryDto } from '@/product/dto/request/product-paginated-query.dto';
import { ProductFeedPaginatedQueryDto } from '@/product/dto/request/product-feed-paginated-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly _productRepository: ProductRepository,
    private readonly _categoryService: CategoryService,
    private readonly _variantsService: VariantService,
    private readonly _mediaService: MediaService,
  ) {}

  private _toProductDto = async (product: Product): Promise<ProductDto> => {
    const category = await this._categoryService.findOne(product.categoryId);
    const variants = await this._variantsService.findByProductId(product.id);
    const images = await this._mediaService.getProductImages(product.id);
    const thumbnail = this._mediaService.getProductThumbnail(product.id);
    return new ProductDto(product, category, variants, images, thumbnail);
  };

  private _toProductsDto = async (
    products: Product[],
  ): Promise<ProductDto[]> => {
    return Promise.all(
      products.map(async (p) => {
        return await this._toProductDto(p);
      }),
    );
  };

  async create(dto: CreateProductDto): Promise<ProductDto> {
    const category = await this._categoryService.findOne(dto.categoryId);
    if (!category) throw new BadRequestException('Category not found');

    const createdProduct = await this._productRepository.create({
      ...dto,
      categoryId: category.id,
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

    return new ProductDto(doc, category, []);
  }

  async find(query: ProductPaginatedQueryDto): Promise<ProductDto[]> {
    const docs = await this._productRepository.find(query);

    return docs.length ? this._toProductsDto(docs) : [];
  }

  async findFeed(query: ProductFeedPaginatedQueryDto): Promise<ProductDto[]> {
    const docs = await this._productRepository.find(query);

    return docs.length ? this._toProductsDto(docs) : [];
  }

  async findById(id: string): Promise<ProductDto> {
    const doc = await this._productRepository.findById(id);

    if (!doc) throw new BadRequestException('Product not found');

    return this._toProductDto(doc);
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductDto> {
    const doc = await this._productRepository.update(id, dto);

    if (dto.variants && dto.variants.length)
      await this._variantsService.createOrUpdateMany(id, dto.variants);

    const product = await this._productRepository.findById(doc.id);

    if (!product) throw new BadRequestException('Product not found');

    return this._toProductDto(product);
  }
}
