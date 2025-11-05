import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@/common/prisma/prisma-client';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';
import { VariantMapper } from '@/product/mappers/variant.mapper';

@Injectable()
export class PrismaVariantRepository {
  constructor(@Inject('PrismaClient') private readonly _prisma: PrismaClient) {}

  async create(
    data: Omit<ProductVariant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductVariant> {
    const doc = await this._prisma.productVariant.create({
      data: VariantMapper.toPersistenceCreate(data),
    });
    return VariantMapper.toEntity(doc);
  }

  async findById(id: string): Promise<ProductVariant | null> {
    const doc = await this._prisma.productVariant.findUnique({ where: { id } });
    return doc ? VariantMapper.toEntity(doc) : null;
  }

  async findByProduct(productId: string): Promise<ProductVariant[]> {
    const docs = await this._prisma.productVariant.findMany({
      where: { productId, isDeleted: false },
    });
    return docs.map(VariantMapper.toEntity);
  }

  async update(
    id: string,
    data: Partial<ProductVariant>,
  ): Promise<ProductVariant> {
    const doc = await this._prisma.productVariant.update({
      where: { id },
      data: VariantMapper.toPersistenceUpdate(data),
    });
    return VariantMapper.toEntity(doc);
  }

  async softDelete(id: string): Promise<void> {
    const variant = await this._prisma.productVariant.findUnique({
      where: { id },
    });
    if (!variant) throw new NotFoundException('Variant not found');
    await this._prisma.productVariant.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
