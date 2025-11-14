import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { UpdateCartDto } from '@/cart/dto/update-cart.dto';
import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { VariantService } from '@/product/variant/variant.service';
import type { CartRepository } from '@/cart/repositories/interfaces/cart.repository';
import type { CartItemRepository } from '@/cart/repositories/interfaces/cart-item.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly _variantService: VariantService,
    @Inject('CartRepository') private readonly _cartRepository: CartRepository,
    @Inject('CartItemRepository')
    private readonly _cartItemRepository: CartItemRepository,
  ) {}

  async createCart(userId: string) {
    return this._cartRepository.createCart(userId);
  }

  async addToCart(userId: string, dto: CreateCartDto) {
    const { variantId, quantity } = dto;

    const variant = await this._variantService.findById(variantId);

    if (!variant) throw new NotFoundException('Product or Variant not found');

    const existingItem = await this._cartItemRepository.findExistingItem(
      userId,
      variantId,
    );

    if (existingItem) {
      return this._cartItemRepository.updateQuantity(existingItem.id, {
        quantity: existingItem.quantity + quantity,
      });
    }

    return this._cartItemRepository.addToCart(userId, dto);
  }

  async getUserCart(userId: string) {
    return this._cartRepository.findByUserId(userId);
  }

  async updateQuantity(userId: string, itemId: string, dto: UpdateCartDto) {
    const item = await this._cartItemRepository.findItemById(itemId);
    if (!item) throw new NotFoundException('Cart item not found');

    const { quantity } = dto;

    if (quantity <= 0) return this.removeItem(userId, itemId);

    return this._cartItemRepository.updateQuantity(itemId, {
      quantity,
    });
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this._cartItemRepository.findItemById(itemId);
    if (!item) throw new NotFoundException('Cart item not found');
    return this._cartItemRepository.removeItem(userId, itemId);
  }

  async clearCart(userId: string) {
    await this._cartItemRepository.clearCart(userId);
    return { message: 'Cart cleared successfully' };
  }
}
