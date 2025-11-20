import { Product } from '@/product/entities/product.entity';
import { ProductPaginatedQueryDto } from '@/product/dto/request/product-paginated-query.dto';
import { ProductFeedPaginatedQueryDto } from '@/product/dto/request/product-feed-paginated-query.dto';

export interface ProductRepository {
  create(
    data: Omit<
      Product,
      'id' | 'variants' | 'status' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<Product>;

  findById(id: string): Promise<Product | null>;

  find(
    query: ProductPaginatedQueryDto | ProductFeedPaginatedQueryDto,
  ): Promise<Product[]>;

  update(
    id: string,
    data: Partial<Omit<Product, 'id' | 'variants' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Product>;

  delete(id: string): Promise<void>;
}
