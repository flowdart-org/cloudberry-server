import { CartItem } from '@prisma/client';

export interface CartItemRepository {
  addToCart(
    userId: string,
    dto: {
      variantId: string;
      quantity: number;
    },
  ): Promise<CartItem>;
  updateQuantity(
    itemId: string,
    dto: {
      quantity: number;
    },
  ): Promise<CartItem>;
  removeItem(userId: string, itemId: string): Promise<CartItem>;
  clearCart(userId: string): Promise<void>;
  findItemById(itemId: string): Promise<CartItem | null>;
  findExistingItem(
    userId: string,
    productId: string,
    variantId?: string,
  ): Promise<CartItem | null>;
}
