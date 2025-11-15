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
import { GetCartResponseDto } from '@/cart/dto/response/get-cart.response.dto';
import { HTTP_RESPONSE } from '@/common/types';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@UserId() userId: string, @Body() dto: CreateCartDto) {
    return this.cartService.addToCart(userId, dto);
  }

  @Get()
  @ApiResponseWithType({}, GetCartResponseDto)
  async getUserCart(
    @UserId() userId: string,
  ): Promise<HTTP_RESPONSE<GetCartResponseDto>> {
    const data = await this.cartService.getUserCart(userId);

    return {
      message: 'Cart retrieved successfully',
      success: true,
      data,
    };
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
}
