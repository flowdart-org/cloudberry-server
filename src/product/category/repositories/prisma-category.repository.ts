import { Category as PrismaCategory } from '@prisma/client';

import { PrismaClient } from '@/common/prisma/prisma-client';
import { CategoryMapper } from '@/product/category/mappers/category.mapper';
import { Category as CategoryEntity } from '@/product/category/entities/category.entity';
import { ICategoryRepository } from '@/product/category/repositories/interfaces/category.repository';
import { Inject } from '@nestjs/common';

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(@Inject('PrismaClient') private readonly _prisma: PrismaClient) {}

  create(
    data: Omit<PrismaCategory, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Promise<CategoryEntity> {
    return this._prisma.category.create({
      data: CategoryMapper.toPersistence(data),
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    search?: string;
    status?: 'active' | 'inactive';
  }): Promise<CategoryEntity[]> {
    const { skip, take, search, status } = params;

    const docs = await this._prisma.category.findMany({
      where: {
        name: search
          ? {
              contains: search,
              mode: 'insensitive',
            }
          : undefined,
        status: status,
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return docs.map(CategoryMapper.toEntity);
  }

  async findAllActive(): Promise<CategoryEntity[]> {
    const docs = await this._prisma.category.findMany({
      where: { status: 'active' },
    });

    return docs.map(CategoryMapper.toEntity);
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const doc = await this._prisma.category.findUnique({
      where: { id },
    });

    return doc ? CategoryMapper.toEntity(doc) : null;
  }

  async update(
    id: string,
    data: Omit<CategoryEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<CategoryEntity> {
    const doc = await this._prisma.category.update({
      where: { id },
      data: CategoryMapper.toPersistence(data),
    });
    return CategoryMapper.toEntity(doc);
  }

  async count(params: {
    search?: string;
    status?: 'active' | 'inactive';
  }): Promise<number> {
    const { search, status } = params;

    const where: {
      status?: 'active' | 'inactive';
      name?: { contains: string; mode: 'insensitive' };
    } = {
      status: undefined,
      name: undefined,
    };

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    if (status) {
      where.status = status;
    }

    return this._prisma.category.count({ where });
  }

  async delete(id: string): Promise<void> {
    await this._prisma.category.delete({
      where: { id },
    });
  }
}
