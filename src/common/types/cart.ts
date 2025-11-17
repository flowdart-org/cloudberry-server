import { Cart } from '@/cart/entities/cart.entity';
import { CartItem } from '@/cart/entities/cart-item.entity';

import { ProductVariant } from '@/product/variant/entities/product-variant.entity';
import { ProductDto } from '@/product/dto/product.dto';

export interface CartWithItems extends Cart {
  items: Array<
    CartItem & {
      product: Pick<
        ProductDto,
        | 'id'
        | 'name'
        | 'description'
        | 'price'
        | 'category'
        | 'thumbnail'
        | 'images'
      >;
      variant: Pick<ProductVariant, 'id' | 'size' | 'stock'>;
    }
  >;
}
