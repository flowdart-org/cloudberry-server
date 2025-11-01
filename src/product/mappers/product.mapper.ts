import {
  Product as PrismaProduct,
  Category as PrismaCategory,
  Prisma,
} from '@prisma/client';
import { Product } from '@/product/entities/product.entity';

export const ProductMapper = {
  toEntity(
    this: void,
    doc: PrismaProduct & { category: PrismaCategory },
  ): Product {
    return new Product(
      doc.id,
      doc.name,
      doc.description,
      doc.price,
      doc.discountPercent,
      doc.category,
      (doc.variants ?? []) as { size: string; stock: number }[],
      doc.status,
      doc.createdAt,
      doc.updatedAt,
    );
  },

  toPersistence(
    entity: Omit<
      Product,
      | 'id'
      | 'createdAt'
      | 'discountPrice'
      | 'discountPercentage'
      | 'variants'
      | 'status'
      | 'updatedAt'
    > & {
      variants: Prisma.JsonArray;
    } & Partial<Pick<Product, 'discountPercentage' | 'status'>>,
  ): Omit<PrismaProduct, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      name: entity.name,
      description: entity.description,
      price: entity.price,
      discountPercent: entity.discountPercentage || 0,
      categoryId: entity.category.id,
      variants: entity.variants,
      status: entity.status ?? 'inactive',
    };
  },
};
