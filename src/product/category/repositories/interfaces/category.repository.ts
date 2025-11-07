import { Category as PrismaCategory } from '@prisma/client';
import { Category as CategoryEntity } from '@/product/category/entities/category.entity';

export interface ICategoryRepository {
  create(
    data: Omit<PrismaCategory, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Promise<CategoryEntity>;

  findById(id: string): Promise<CategoryEntity | null>;

  findAll(): Promise<CategoryEntity[]>;

  findAllActive(): Promise<CategoryEntity[]>;

  update(id: string, data: Partial<PrismaCategory>): Promise<CategoryEntity>;

  delete(id: string): Promise<void>;
}
