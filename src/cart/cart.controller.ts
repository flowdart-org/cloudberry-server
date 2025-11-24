import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';

import { HTTP_RESPONSE } from '@/common/types';
import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { UpdateCartDto } from '@/cart/dto/update-cart.dto';
import { CartService } from '@/cart/services/cart.service';
import { UserId } from '@/common/decorators/user-id.decorator';
import { CartResponseDto } from '@/cart/dto/response/cart.response.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { CheckoutCartResponseDto } from '@/cart/dto/response/checkout-cart.response.dto';
import { CheckoutCartLinkResponseDto } from '@/cart/dto/response/checkout-cart-link.response.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly _cartService: CartService) {}

  @Post('add')
  addToCart(@UserId() userId: string, @Body() dto: CreateCartDto) {
    return this._cartService.addToCart(userId, dto);
  }

  @Get()
  @ApiResponseWithType({}, CartResponseDto)
  async getUserCart(
    @UserId() userId: string,
  ): Promise<HTTP_RESPONSE<CartResponseDto>> {
    const data = await this._cartService.getUserCart(userId);

    return {
      message: 'Cart retrieved successfully',
      success: true,
      data: CartResponseDto.fromEntity(data),
    };
  }

  @Patch(':itemId')
  updateQuantity(
    @UserId() userId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartDto,
  ) {
    return this._cartService.updateQuantity(userId, itemId, dto);
  }

  @Post('checkout')
  @ApiResponseWithType({}, CheckoutCartResponseDto)
  async checkout(
    @UserId() userId: string,
  ): Promise<HTTP_RESPONSE<CheckoutCartResponseDto>> {
    const data = await this._cartService.checkout(userId);

    return {
      message: 'Cart checkout initiated successfully',
      success: true,
      data: new CheckoutCartResponseDto(data),
    };
  }

  @Post('checkout/link')
  @ApiResponseWithType({}, CheckoutCartLinkResponseDto)
  async checkoutLink(
    @UserId() userId: string,
  ): Promise<HTTP_RESPONSE<CheckoutCartLinkResponseDto>> {
    const data = await this._cartService.checkoutLink(userId);

    return {
      message: 'Cart checkout initiated successfully',
      success: true,
      data: new CheckoutCartLinkResponseDto(data),
    };
  }

  @Delete(':itemId')
  removeItem(@UserId() userId: string, @Param('itemId') itemId: string) {
    return this._cartService.removeItem(userId, itemId);
  }
}
