import { Category as PrismaCategory } from '@prisma/client';
import { Category } from '@/product/category/entities/category.entity';

export const CategoryMapper = {
  toEntity(this: void, prismaCategory: PrismaCategory): Category {
    return new Category(
      prismaCategory.id,
      prismaCategory.name,
      prismaCategory.status,
      prismaCategory.createdAt,
      prismaCategory.updatedAt,
    );
  },

  toPersistence(
    category: Omit<Category, 'id' | 'status' | 'createdAt' | 'updatedAt'> &
      Partial<Pick<Category, 'status'>>,
  ): Omit<PrismaCategory, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: category.name,
      status: category.status || 'inactive',
    };
  },
};
