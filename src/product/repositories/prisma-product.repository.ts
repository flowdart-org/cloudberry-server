import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Product as PrismaProduct } from '@prisma/client';

import { PrismaClient } from '@/common/prisma/prisma-client';
import { ProductMapper } from '@/product/mappers/product.mapper';
import { Product as ProductEntity } from '@/product/entities/product.entity';
import { ProductRepository } from '@/product/repositories/interfaces/product.repository';
import { ProductPaginatedQueryDto } from '@/product/dto/request/product-paginated-query.dto';
import { ProductFeedPaginatedQueryDto } from '@/product/dto/request/product-feed-paginated-query.dto';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(@Inject('PrismaClient') private readonly _prisma: PrismaClient) {}

  async create(
    data: Omit<ProductEntity, 'id' | 'variants' | 'createdAt' | 'updatedAt'> &
      Partial<Pick<PrismaProduct, 'status'>>,
  ): Promise<ProductEntity> {
    const persistenceData = ProductMapper.toPersistenceCreate(data);

    if (!persistenceData.categoryId) throw new Error('Category ID is required');

    const doc = await this._prisma.product.create({
      data: { ...persistenceData },
    });

    return ProductMapper.toEntity(doc);
  }

  async find(
    query: ProductPaginatedQueryDto | ProductFeedPaginatedQueryDto,
  ): Promise<ProductEntity[]> {
    const { page = 1, limit = 10, search } = query;

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    if ('status' in query && query.status) {
      where.status = query.status;
    }

    if ('minPrice' in query || 'maxPrice' in query || 'categories' in query) {
      if (query.minPrice !== undefined || query.maxPrice !== undefined) {
        where.price = {};
        if (query.minPrice !== undefined) where.price.gte = query.minPrice;
        if (query.maxPrice !== undefined) where.price.lte = query.maxPrice;
      }

      if (query.categories?.length) {
        where.categoryId = { in: query.categories };
      }
    }

    const docs = await this._prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return docs.map(ProductMapper.toEntity);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const doc = await this._prisma.product.findUnique({
      where: { id },
    });
    return doc ? ProductMapper.toEntity(doc) : null;
  }

  async update(
    id: string,
    data: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ProductEntity> {
    const doc = await this._prisma.product.update({
      where: { id },
      data: ProductMapper.toPersistenceUpdate(data),
    });
    return ProductMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await this._prisma.product.delete({
      where: { id },
    });
  }
}
