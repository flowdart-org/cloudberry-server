import { Product as ProductEntity } from '@/product/entities/product.entity';

export interface VariantRepository {
  create(
    data: Omit<ProductEntity, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductEntity>;

  findById(id: string): Promise<ProductEntity | null>;

  findAll(): Promise<ProductEntity[]>;

  update(
    id: string,
    data: Partial<Omit<ProductEntity, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<ProductEntity>;

  delete(id: string): Promise<void>;
}
