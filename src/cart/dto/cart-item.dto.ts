import { ProductDto } from '@/product/dto/product.dto';
import { CartItem } from '@/cart/entities/cart-item.entity';
import { VariantDto } from '@/product/variant/dto/variant.dto';
import { ProductVariant } from '@/product/variant/entities/product-variant.entity';

export class CartItemDto {
  id: string;
  quantity: number;
  product: Pick<ProductDto, 'id' | 'name' | 'price' | 'thumbnail'> & {
    category: Pick<ProductDto['category'], 'id' | 'name'>;
  };
  variant: Pick<ProductVariant, 'id' | 'size' | 'stock' | 'isDeleted'>;

  static fromEntity(
    this: void,
    item: CartItem,
    product: ProductDto,
    variant: Omit<VariantDto, 'id'> & { id: string },
  ): CartItemDto {
    return {
      id: item.id,
      quantity: item.quantity,
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail,
        category: {
          id: product.category.id,
          name: product.category.name,
        },
      },
      variant: {
        id: variant.id,
        size: variant.size,
        stock: variant.stock,
        isDeleted: false,
      },
    };
  }
}
