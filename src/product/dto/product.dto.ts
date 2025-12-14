import { Product } from '@/product/entities/product.entity';
import { Category } from '@/product/category/entities/category.entity';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';

export class ProductDto {
  public readonly id: string;

  public readonly name: string;

  public readonly description: string;

  public readonly price: number;

  public readonly discountPrice: number;

  public readonly discountPercent?: number;

  public readonly thumbnail?: string;

  public readonly images: string[];

  public readonly variants: {
    id: string;
    size: string;
    stock: number;
    isDeleted: boolean;
  }[];

  public readonly categoryId: string;

  public readonly category: Omit<Category, 'status'>;

  public readonly tryOn: boolean;

  public readonly status: 'active' | 'inactive';

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  constructor(
    entity: Product,
    category: Category,
    variants: ProductVariant[],
    images: string[] = [],
    thumbnail?: string,
  ) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.price = entity.price;
    this.discountPercent = entity.discountPercent || undefined;

    this.discountPrice = entity.finalPrice;

    this.images = images;
    this.variants = variants.map((variant) => ({
      id: variant.id,
      size: variant.size,
      stock: variant.stock,
      isDeleted: variant.isDeleted,
    }));
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.status = entity.status;
    this.tryOn = entity.tryOn;
    this.thumbnail = thumbnail || images[0];

    if (category) {
      this.category = {
        ...category,
        updatedAt: undefined,
        createdAt: undefined,
      };
    } else {
      this.categoryId = entity.categoryId;
    }
  }
}
