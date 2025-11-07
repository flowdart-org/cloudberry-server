import { Product as ProductEntity } from '@/product/entities/product.entity';

export interface ProductRepository {
  create(
    data: Omit<
      ProductEntity,
      'id' | 'variants' | 'status' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<ProductEntity>;

  findById(id: string): Promise<ProductEntity | null>;

  findAll(): Promise<ProductEntity[]>;

  findAllActive(): Promise<ProductEntity[]>;

  update(
    id: string,
    data: Partial<
      Omit<ProductEntity, 'id' | 'variants' | 'createdAt' | 'updatedAt'>
    >,
  ): Promise<ProductEntity>;

  delete(id: string): Promise<void>;
}
