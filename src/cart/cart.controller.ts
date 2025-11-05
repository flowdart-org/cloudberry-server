import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';

import { CartService } from '@/cart/cart.service';
import { CreateCartDto } from '@/cart/dto/create-cart.dto';
import { UpdateCartDto } from '@/cart/dto/update-cart.dto';
import { UserId } from '@/common/decorators/user-id.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@UserId() userId: string, @Body() dto: CreateCartDto) {
    return this.cartService.addToCart(userId, dto);
  }

  @Get()
  getUserCart(@UserId() userId: string) {
    return this.cartService.getUserCart(userId);
  }

  @Patch(':itemId')
  updateQuantity(
    @UserId() userId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartDto,
  ) {
    return this.cartService.updateQuantity(userId, itemId, dto);
  }

  @Delete(':itemId')
  removeItem(@UserId() userId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(userId, itemId);
  }

  @Delete()
  clearCart(@UserId() userId: string) {
    return this.cartService.clearCart(userId);
  }
}
