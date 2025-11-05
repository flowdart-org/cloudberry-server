import { Prisma, ProductVariant as PrismaVariant } from '@prisma/client';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';

export const VariantMapper = {
  toEntity(this: void, doc: PrismaVariant): ProductVariant {
    return new ProductVariant(
      doc.id,
      doc.productId,
      doc.size || '',
      doc.stock,
      doc.sku,
      doc.isDeleted,
      doc.createdAt,
      doc.updatedAt,
    );
  },

  toPersistenceCreate(
    entity: Omit<ProductVariant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Prisma.ProductVariantCreateInput {
    return {
      size: entity.size,
      stock: entity.stock,
      sku: entity.sku,
      isDeleted: entity.isDeleted ?? false,
      product: { connect: { id: entity.productId } },
    };
  },

  toPersistenceUpdate(
    entity: Partial<Omit<ProductVariant, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Prisma.ProductVariantUpdateInput {
    return {
      size: entity.size,
      stock: entity.stock,
      sku: entity.sku,
      isDeleted: entity.isDeleted,
    };
  },
};
