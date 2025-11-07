import {
  Product as PrismaProduct,
  Category as PrismaCategory,
  ProductVariant as PrismaProductVariant,
  Prisma,
} from '@prisma/client';
import { Product } from '@/product/entities/product.entity';

// interface Variant {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   size: string;
//   stock: number;
//   productId: string;
//   sku: string | null;
//   isDeleted: boolean;
// }

export const ProductMapper = {
  toEntity(
    this: void,
    doc: PrismaProduct & {
      category: PrismaCategory;
      variants: PrismaProductVariant[];
    },
  ): Product {
    return new Product(
      doc.id,
      doc.name,
      doc.description,
      doc.price,
      doc.discountPercent,
      doc.category,
      doc.variants,
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
      discountPercent: entity.discountPercent || 0,
      categoryId: entity.category.id,
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
      discountPercent: entity.discountPercent || 0,
      tryOn: entity.tryOn,
      categoryId: entity.category?.id || undefined,
      status: entity.status ?? 'inactive',
    };
  },
};
