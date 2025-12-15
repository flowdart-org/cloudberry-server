import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Product as PrismaProduct } from '@prisma/client';

import { Product } from '@/product/entities/product.entity';
import { PrismaService } from '@/common/prisma/prisma.service';
import { ProductMapper } from '@/product/mappers/product.mapper';
import { ProductRepository } from '@/product/repositories/interfaces/product.repository';
import { ProductPaginatedQueryDto } from '@/product/dto/request/product-paginated-query.dto';
import { ProductFeedPaginatedQueryDto } from '@/product/dto/request/product-feed-paginated-query.dto';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(
    @Inject('PrismaService') private readonly _prisma: PrismaService,
  ) {}

  async create(
    data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> &
      Partial<Pick<PrismaProduct, 'status'>>,
  ): Promise<Product> {
    const persistenceData = ProductMapper.toPersistenceCreate(data);

    const doc = await this._prisma.product.create({
      data: persistenceData,
    });

    return ProductMapper.toEntity(doc);
  }

  async find(
    query: ProductPaginatedQueryDto | ProductFeedPaginatedQueryDto,
  ): Promise<Product[]> {
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
        where.finalPrice = {};
        if (query.minPrice !== undefined) where.finalPrice.gte = query.minPrice;
        if (query.maxPrice !== undefined) where.finalPrice.lte = query.maxPrice;
      }

      if (query.categories?.length) {
        where.categoryId = { in: query.categories };
      }
    }

    if ('sizes' in query && query.sizes) {
      where.variants = {
        some: {
          size: { in: query.sizes },
        },
      };
    }

    const docs = await this._prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return docs.map(ProductMapper.toEntity);
  }

  async findById(id: string): Promise<Product | null> {
    const doc = await this._prisma.product.findUnique({
      where: { id },
    });
    return doc ? ProductMapper.toEntity(doc) : null;
  }

  countAll(): Promise<number> {
    return this._prisma.product.count();
  }

  async update(
    id: string,
    data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Product> {
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
