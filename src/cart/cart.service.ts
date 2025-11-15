import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { UpdateCartDto } from '@/cart/dto/update-cart.dto';
import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { VariantService } from '@/product/variant/variant.service';
import type { CartRepository } from '@/cart/repositories/interfaces/cart.repository';
import type { CartItemRepository } from '@/cart/repositories/interfaces/cart-item.repository';
import { GetCartResponseDto } from '@/cart/dto/response/get-cart.response.dto';

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

    let cart = await this._cartRepository.findByUserId(userId);

    if (!cart) {
      cart = await this.createCart(userId);
    }

    const existingItem = await this._cartItemRepository.findExistingItem(
      cart.id,
      variant.productId,
      variantId,
    );

    if (existingItem) {
      return this._cartItemRepository.updateQuantity(existingItem.id, {
        quantity: quantity,
      });
    }

    return this._cartItemRepository.addToCart(cart.id, {
      productId: variant.productId,
      variantId,
      quantity,
    });
  }

  async getUserCart(userId: string): Promise<GetCartResponseDto> {
    let cart = await this._cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.createCart(userId);
    }
    return new GetCartResponseDto(cart);
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
    const cart = await this._cartRepository.findByUserId(userId);

    if (!cart) throw new NotFoundException('Cart not found');

    const item = cart?.items.find((item) => {
      console.log(item.id, itemId);
      return item.id === itemId;
    });

    // const item = await this._cartItemRepository.findItemById(itemId);

    console.log(cart, 'item', item);

    if (!item) throw new NotFoundException('Item not found in this cart');

    return this._cartItemRepository.removeItem(itemId);
  }

  async clearCart(userId: string) {
    await this._cartItemRepository.clearCart(userId);
    return { message: 'Cart cleared successfully' };
  }
}
