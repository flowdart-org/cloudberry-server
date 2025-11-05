import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';

import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { UpdateCartDto } from '@/cart/dto/update-cart.dto';
import { ProductService } from '@/product/product.service';
import type { CartRepository } from '@/cart/repositories/interfaces/cart.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly _productService: ProductService,
    @Inject('CartRepository') private readonly cartRepository: CartRepository,
  ) {}

  async addToCart(userId: string, dto: CreateCartDto) {
    const { productId, variantId, quantity } = dto;

    const product = await this._productService.findOne(productId);

    if (!product) throw new NotFoundException('Product not found');

    if (variantId && !product.variants.some((v) => v.id === variantId)) {
      throw new BadRequestException('Invalid variant');
    }

    const existingItem = await this.cartRepository.findExistingItem(
      userId,
      productId,
      variantId,
    );

    if (existingItem) {
      return this.cartRepository.updateQuantity(userId, existingItem.id, {
        quantity: existingItem.quantity + quantity,
      });
    }

    return this.cartRepository.addToCart(userId, dto);
  }

  async getUserCart(userId: string) {
    return this.cartRepository.findUserCart(userId);
  }

  async updateQuantity(userId: string, itemId: string, dto: UpdateCartDto) {
    const item = await this.cartRepository.findItemById(itemId);
    if (!item || item.userId !== userId)
      throw new NotFoundException('Cart item not found');

    if (dto.quantity <= 0) return this.removeItem(userId, itemId);
    return this.cartRepository.updateQuantity(userId, itemId, dto);
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.cartRepository.findItemById(itemId);
    if (!item || item.userId !== userId)
      throw new NotFoundException('Cart item not found');
    return this.cartRepository.removeItem(userId, itemId);
  }

  async clearCart(userId: string) {
    await this.cartRepository.clearCart(userId);
    return { message: 'Cart cleared successfully' };
  }
}
