import { Category } from '@/product/category/entities/category.entity';

export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly discountPercentage: number | null,
    public readonly category: Category,
    public readonly variants: { size: string; stock: number }[],
    public readonly status: 'active' | 'inactive',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
