import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { CartItem } from '@prisma/client';
import { CartWithItems } from '@/common/types/cart';
import { OrderItem } from '@/order/entities/order.entity';
import { UpdateCartDto } from '@/cart/dto/update-cart.dto';
import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { ProductService } from '@/product/product.service';
import { OrderService } from '@/order/services/order.service';
import { VariantService } from '@/product/variant/variant.service';
import { RazorpayService } from '@/payment/services/razorpay.service';
import type { CartRepository } from '@/cart/repositories/interfaces/cart.repository';
import type { CartItemRepository } from '@/cart/repositories/interfaces/cart-item.repository';

@Injectable()
export class CartService {
  constructor(
    @Inject('CartRepository') private readonly _cartRepository: CartRepository,
    @Inject('CartItemRepository')
    private readonly _cartItemRepository: CartItemRepository,
    private readonly _variantService: VariantService,
    private readonly _productService: ProductService,
    private readonly _paymentService: RazorpayService,
    private readonly _orderService: OrderService,
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

  async getUserCart(userId: string): Promise<CartWithItems> {
    let cart = await this._cartRepository.findByUserId(userId);

    if (!cart) {
      cart = await this.createCart(userId);
    }

    const cartItems = await Promise.all(
      cart.items.map(async (item) => {
        const variant = await this._variantService.findById(item.variantId);

        if (!variant) {
          throw new NotFoundException('Variant not found');
        }

        const product = await this._productService.findById(variant.productId);

        return {
          ...item,
          product,
          variant,
        };
      }),
    );

    return { ...cart, items: cartItems };
  }

  async updateQuantity(
    userId: string,
    itemId: string,
    dto: UpdateCartDto,
  ): Promise<CartItem> {
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

  // async checkout(userId: string): Promise<CheckoutCartResponseDto> {
  //   const cart = await this._cartRepository.findByUserId(userId);
  //
  //   if (!cart) throw new NotFoundException('Cart not found');
  //
  //   let amount = 0;
  //
  //   for (const item of cart.items) {
  //     const product = await this._productService.findById(item.productId);
  //
  //     if (!product) {
  //       throw new NotFoundException('Product not found');
  //     }
  //     amount += product.price * item.quantity;
  //   }
  //
  //   return new CheckoutCartResponseDto(
  //     await this._paymentService.createOrder(userId, amount, 'INR'),
  //   );
  // }

  async checkout(userId: string) {
    const cart = await this._cartRepository.findByUserId(userId);

    if (!cart) throw new NotFoundException('Cart not found');

    let amount = 0;

    const items: OrderItem[] = [];

    for (const item of cart.items) {
      const variant = await this._variantService.findById(item.variantId);

      if (!variant) throw new NotFoundException('Variant not found');

      const product = await this._productService.findById(variant.productId);

      if (!product) throw new NotFoundException('Product not found');

      if (variant.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name} - ${product.name}. Available: ${variant.stock}`,
        );
      }

      const lineTotal = product.price * item.quantity;
      amount += lineTotal;

      items.push({
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: lineTotal,
      });
    }

    const order = await this._orderService.create({
      userId,
      subtotal: amount,
      total: amount,
      items,
      metadata: { cartId: cart.id },
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    return this._paymentService.createOrder(userId, amount, 'INR', {
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  }

  async checkoutLink(userId: string) {
    const cart = await this._cartRepository.findByUserId(userId);

    if (!cart) throw new NotFoundException('Cart not found');

    let amount = 0;

    const items: OrderItem[] = [];

    for (const item of cart.items) {
      const variant = await this._variantService.findById(item.variantId);

      if (!variant) throw new NotFoundException('Variant not found');

      const product = await this._productService.findById(variant.productId);

      if (!product) throw new NotFoundException('Product not found');

      if (variant.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name} - ${product.name}. Available: ${variant.stock}`,
        );
      }

      const lineTotal = product.price * item.quantity;
      amount += lineTotal;

      items.push({
        productId: product.id,
        variantId: variant.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: lineTotal,
      });
    }

    const order = await this._orderService.create({
      userId,
      subtotal: amount,
      total: amount,
      items,
      metadata: { cartId: cart.id },
      paymentStatus: 'pending',
      orderStatus: 'pending',
    });

    return this._paymentService.createPaymentLink(userId, amount, 'INR', {
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  }

  async clearCart(userId: string) {
    await this._cartItemRepository.clearCart(userId);
    return { message: 'Cart cleared successfully' };
  }
}
