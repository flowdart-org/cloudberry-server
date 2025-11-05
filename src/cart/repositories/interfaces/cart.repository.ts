import { CartItem } from '@prisma/client';

import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { UpdateCartDto } from '@/cart/dto/update-cart.dto';

export interface CartRepository {
  addToCart(userId: string, dto: CreateCartDto): Promise<CartItem>;
  findUserCart(userId: string): Promise<CartItem[]>;
  updateQuantity(
    userId: string,
    itemId: string,
    dto: UpdateCartDto,
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
