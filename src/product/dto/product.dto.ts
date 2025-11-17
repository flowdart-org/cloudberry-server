import { Product } from '@/product/entities/product.entity';
import { Category } from '@/product/category/entities/category.entity';

export class ProductDto {
  public readonly id: string;

  public readonly name: string;

  public readonly description: string;

  public readonly price: number;

  public readonly discountPrice?: number;

  public readonly discountPercent: number | null;

  public readonly thumbnail?: string;

  public readonly images: string[];

  public readonly variants: { id: string; size: string; stock: number }[];

  public readonly categoryId: string;

  public readonly category: Category;

  public readonly tryOn: boolean;

  public readonly status: 'active' | 'inactive';

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  constructor(
    entity: Product,
    category: Category,
    images: string[] = [],
    thumbnail?: string,
  ) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.price = entity.price;
    this.discountPercent = entity.discountPercent || null;
    this.discountPrice =
      (entity.price / 100) * (100 - (entity.discountPercent || 0));
    this.images = images;
    this.variants = entity.variants;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.status = entity.status;
    this.tryOn = entity.tryOn;
    this.thumbnail = thumbnail || images[0];
    if (category) {
      this.category = {
        ...entity.category,
        updatedAt: undefined,
        createdAt: undefined,
      };
    } else {
      this.categoryId = entity.category.id;
    }
  }
}
