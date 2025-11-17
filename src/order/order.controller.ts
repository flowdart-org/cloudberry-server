import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';

import { HTTP_RESPONSE } from '@/common/types';
import { OrderService } from '@/order/order.service';
import { UpdateOrderDto } from '@/order/dto/update-order.dto';
import { UserId } from '@/common/decorators/user-id.decorator';
import { OrderResponseDto } from '@/order/dto/response/order.response.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiResponseWithType({ isArray: true }, OrderResponseDto)
  async findAll(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ): Promise<HTTP_RESPONSE<OrderResponseDto[]>> {
    const orders = await this.orderService.listAll(limit, offset);

    return {
      message: 'Orders retrieved successfully',
      success: true,
      data: orders.map(OrderResponseDto.fromEntity),
    };
  }

  @Get('/user')
  @ApiResponseWithType({ isArray: true }, OrderResponseDto)
  async findAllByUser(
    @UserId() userId: string,
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ): Promise<HTTP_RESPONSE<OrderResponseDto[]>> {
    const orders = await this.orderService.listByUser(userId, limit, offset);

    return {
      message: 'User orders retrieved successfully',
      success: true,
      data: orders.map(OrderResponseDto.fromEntity),
    };
  }

  @Get('/:id')
  @ApiResponseWithType({}, OrderResponseDto)
  async findOne(
    @Param('id') id: string,
  ): Promise<HTTP_RESPONSE<OrderResponseDto>> {
    const order = await this.orderService.findById(id);

    return {
      message: 'Order retrieved successfully',
      success: true,
      data: OrderResponseDto.fromEntity(order),
    };
  }

  @Patch('/:id')
  @ApiResponseWithType({}, OrderResponseDto)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<HTTP_RESPONSE<OrderResponseDto>> {
    const existing = await this.orderService.findById(id);
    const updatedEntity = existing.with(dto);
    const updated = await this.orderService.update(updatedEntity);

    return {
      message: 'Order updated successfully',
      success: true,
      data: OrderResponseDto.fromEntity(updated),
    };
  }
}
