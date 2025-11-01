import { Product as PrismaProduct } from '@prisma/client';
import { Product as ProductEntity } from '@/product/entities/product.entity';

export interface ProductRepository {
  create(
    data: Omit<ProductEntity, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Promise<ProductEntity>;

  findById(id: string): Promise<ProductEntity | null>;

  findAll(): Promise<ProductEntity[]>;

  update(id: string, data: Partial<PrismaProduct>): Promise<ProductEntity>;

  delete(id: string): Promise<void>;
}
