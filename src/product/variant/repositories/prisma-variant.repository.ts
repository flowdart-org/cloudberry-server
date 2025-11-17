import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@/common/prisma/prisma-client';
import { VariantMapper } from '@/product/mappers/variant.mapper';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';
import { VariantRepository } from '@/product/variant/repositories/interfaces/variant.repository';

@Injectable()
export class PrismaVariantRepository implements VariantRepository {
  constructor(@Inject('PrismaClient') private readonly _prisma: PrismaClient) {}

  async create(
    data: Omit<ProductVariant, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductVariant> {
    const doc = await this._prisma.productVariant.create({
      data: VariantMapper.toPersistenceCreate(data),
    });
    return VariantMapper.toEntity(doc);
  }

  async createMany(
    data: Array<
      Omit<ProductVariant, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): Promise<ProductVariant[]> {
    const docs = await this._prisma.$transaction(
      data.map((variant) =>
        this._prisma.productVariant.create({
          data: VariantMapper.toPersistenceCreate(variant),
        }),
      ),
    );
    return docs.map(VariantMapper.toEntity);
  }

  /** Get all variants */
  async findAll(): Promise<ProductVariant[]> {
    const docs = await this._prisma.productVariant.findMany();
    return docs.map(VariantMapper.toEntity);
  }

  async findById(id: string): Promise<ProductVariant | null> {
    const doc = await this._prisma.productVariant.findUnique({ where: { id } });
    return doc ? VariantMapper.toEntity(doc) : null;
  }

  async findManyByProductId(productId: string): Promise<ProductVariant[]> {
    const docs = await this._prisma.productVariant.findMany({
      where: { productId },
    });
    return docs.length ? docs.map(VariantMapper.toEntity) : [];
  }

  async update(
    id: string,
    data: Partial<ProductVariant>,
  ): Promise<ProductVariant> {
    const existing = await this._prisma.productVariant.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Variant not found');

    const doc = await this._prisma.productVariant.update({
      where: { id },
      data: VariantMapper.toPersistenceUpdate(data),
    });
    return VariantMapper.toEntity(doc);
  }

  async delete(id: string): Promise<void> {
    const existing = await this._prisma.productVariant.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException('Variant not found');

    await this._prisma.productVariant.delete({ where: { id } });
  }

  async deleteByProductId(productId: string) {
    await this._prisma.productVariant.deleteMany({ where: { productId } });
  }
}
