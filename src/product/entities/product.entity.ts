import { Category } from '@/product/category/entities/category.entity';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly discountPercent: number | null,
    public readonly category: Category,
    public readonly variants: ProductVariant[],
    public readonly tryOn: boolean,
    public readonly status: 'active' | 'inactive',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
