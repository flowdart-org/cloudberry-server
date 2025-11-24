import { Category as PrismaCategory } from '@prisma/client';
import { Category } from '@/product/category/entities/category.entity';

export interface ICategoryRepository {
  create(
    data: Omit<PrismaCategory, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Promise<Category>;

  findById(id: string): Promise<Category | null>;

  findAll(params: {
    skip?: number;
    take?: number;
    search?: string;
    status?: 'active' | 'inactive';
  }): Promise<Category[]>;

  findAllActive(): Promise<Category[]>;

  update(id: string, data: Partial<PrismaCategory>): Promise<Category>;

  count(params: {
    search?: string;
    status?: 'active' | 'inactive';
  }): Promise<number>;

  delete(id: string): Promise<void>;
}
