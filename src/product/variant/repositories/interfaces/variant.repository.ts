import { ProductVariant } from '@/product/variant/entities/product-variant.entity';

export interface VariantRepository {
  createMany(
    data: Array<
      Omit<ProductVariant, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): Promise<ProductVariant[]>;

  create(
    data: Omit<ProductVariant, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductVariant>;

  findById(id: string): Promise<ProductVariant | null>;

  findManyByProductId(productId: string): Promise<ProductVariant[] | []>;

  findAll(): Promise<ProductVariant[]>;

  update(
    id: string,
    data: Partial<Omit<ProductVariant, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ProductVariant>;

  delete(id: string): Promise<void>;

  deleteByProductId(productId: string): Promise<void>;
}
