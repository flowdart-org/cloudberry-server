import { Product as PrismaProduct, Prisma } from '@prisma/client';

import { Product } from '@/product/entities/product.entity';

export const ProductMapper = {
  toEntity(this: void, doc: PrismaProduct): Product {
    return new Product(
      doc.id,
      doc.name,
      doc.description,
      doc.categoryId,
      doc.price,
      doc.discountPercent,
      doc.tryOn,
      doc.status,
      doc.createdAt,
      doc.updatedAt,
    );
  },

  toPersistenceCreate(
    entity: Omit<
      Product,
      | 'id'
      | 'variants'
      | 'createdAt'
      | 'discountPrice'
      | 'discountPercentage'
      | 'status'
      | 'updatedAt'
    > &
      Pick<Product, 'discountPercent' | 'status'>,
  ): Prisma.ProductUncheckedCreateInput {
    return {
      name: entity.name,
      description: entity.description,
      price: entity.price,
      discountPercent: entity.discountPercent,
      categoryId: entity.categoryId,
      status: entity.status ?? 'inactive',
    };
  },

  toPersistenceUpdate(
    entity: Partial<
      Omit<
        Product,
        | 'id'
        | 'createdAt'
        | 'discountPrice'
        | 'discountPercentage'
        | 'variants'
        | 'status'
        | 'updatedAt'
      > &
        Pick<Product, 'discountPercent' | 'status'>
    >,
  ): Prisma.ProductUncheckedUpdateInput {
    return {
      name: entity.name,
      description: entity.description,
      price: entity.price,
      discountPercent: entity.discountPercent,
      tryOn: entity.tryOn,
      categoryId: entity.categoryId,
      status: entity.status ?? 'inactive',
    };
  },
};
