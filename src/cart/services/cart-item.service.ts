import { Injectable, Inject } from '@nestjs/common';

import type { CartItemRepository } from '@/cart/repositories/interfaces/cart-item.repository';

@Injectable()
export class CartItemService {
  constructor(
    @Inject('CartItemRepository')
    private readonly _cartItemRepository: CartItemRepository,
  ) {}
}
