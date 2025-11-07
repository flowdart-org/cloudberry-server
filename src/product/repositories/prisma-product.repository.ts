import { Inject, Injectable } from '@nestjs/common';
import {
  Prisma,
  Product as PrismaProduct,
  Category as PrismaCategory,
  ProductVariant as PrismaProductVariant,
} from '@prisma/client';

import { PrismaClient } from '@/common/prisma/prisma-client';
import { ProductMapper } from '@/product/mappers/product.mapper';
import { Product as ProductEntity } from '@/product/entities/product.entity';
import { ProductRepository } from '@/product/repositories/interfaces/product.repository';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(@Inject('PrismaClient') private readonly _prisma: PrismaClient) {}

  private readonly _include = {
    category: true,
    variants: true,
  } satisfies Prisma.ProductInclude;

  async create(
    data: Omit<ProductEntity, 'id' | 'variants' | 'createdAt' | 'updatedAt'> & {
      category: PrismaCategory;
    } & Partial<Pick<PrismaProduct, 'status'>>,
  ): Promise<ProductEntity> {
    const persistenceData = ProductMapper.toPersistenceCreate(data);

    if (!persistenceData.categoryId) throw new Error('Category ID is required');

    const doc = (await this._prisma.product.create({
      data: { ...persistenceData },
      include: this._include,
    })) as PrismaProduct & {
      category: PrismaCategory;
      variants: PrismaProductVariant[];
    };

    return ProductMapper.toEntity(doc);
  }

  async findAll(): Promise<ProductEntity[]> {
    const docs = await this._prisma.product.findMany({
      include: this._include,
    });
    console.log('docs with variants', docs);
    return docs.map(ProductMapper.toEntity);
  }

  async findAllActive(): Promise<ProductEntity[]> {
    const docs = await this._prisma.product.findMany({
      where: { status: 'active' },
      include: this._include,
    });
    console.log('docs with variants', docs);
    return docs.map(ProductMapper.toEntity);
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const doc = await this._prisma.product.findUnique({
      where: { id },
      include: this._include,
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
      include: this._include,
    });
    return ProductMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    await this._prisma.product.delete({
      where: { id },
    });
  }
}
