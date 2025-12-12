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
      doc.finalPrice,
      doc.tryOn,
      doc.status,
      doc.createdAt,
      doc.updatedAt,
    );
  },

  toPersistenceCreate(
    entity: Omit<Product, 'id' | 'createdAt' | 'discountPrice' | 'updatedAt'>,
  ): Prisma.ProductUncheckedCreateInput {
    return {
      name: entity.name,
      description: entity.description,
      price: entity.price,
      discountPercent: entity.discountPercent,
      finalPrice: entity.discountPercent
        ? Math.round(entity.price * (1 - entity.discountPercent / 100))
        : entity.price,
      tryOn: entity.tryOn,
      categoryId: entity.categoryId,
      status: entity.status,
    };
  },

  toPersistenceUpdate(
    entity: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Prisma.ProductUncheckedUpdateInput {
    return {
      name: entity.name,
      description: entity.description,
      price: entity.price,
      discountPercent: entity.discountPercent,
      finalPrice: entity.price
        ? entity.discountPercent
          ? Math.round(entity.price * (1 - entity.discountPercent / 100))
          : entity.price
        : undefined,
      tryOn: entity.tryOn,
      categoryId: entity.categoryId,
      status: entity.status,
    };
  },
};
