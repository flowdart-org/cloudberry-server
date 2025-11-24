import { Controller, Get, Patch, Param, Body, Query } from '@nestjs/common';

import {
  HttpPaginatedResponse,
  HttpResponse,
} from '@/common/dto/http-response.dto';
import { OrderService } from '@/order/order.service';
import { UserId } from '@/common/decorators/user-id.decorator';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';
import { OrderResponseDto } from '@/order/dto/response/order.response.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { UpdateOrderDto } from '@/order/dto/request/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiResponseWithType({ isArray: true }, OrderResponseDto)
  async findAll(
    @Query() query: PaginatedQueryDto,
  ): Promise<HttpPaginatedResponse<OrderResponseDto[]>> {
    const { page, limit } = query;

    const { orders, total } = await this.orderService.listAll(limit, page);

    return {
      message: 'Orders retrieved successfully',
      success: true,
      data: orders.map(OrderResponseDto.fromEntity),
      limit,
      page,
      total,
    };
  }

  @Get('/user')
  @ApiResponseWithType({ isArray: true }, OrderResponseDto)
  async findAllByUser(
    @UserId() userId: string,
    @Query() query: PaginatedQueryDto,
  ): Promise<HttpPaginatedResponse<OrderResponseDto[]>> {
    const { page, limit } = query;

    const { orders } = await this.orderService.listByUser(userId, limit, page);

    return {
      message: 'User orders retrieved successfully',
      success: true,
      data: orders.map(OrderResponseDto.fromEntity),
      limit: query.limit,
      page: query.page,
      total: orders.length,
    };
  }

  @Get('/:id')
  @ApiResponseWithType({}, OrderResponseDto)
  async findOne(
    @Param('id') id: string,
  ): Promise<HttpResponse<OrderResponseDto>> {
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
  ): Promise<HttpResponse<OrderResponseDto>> {
    const updated = await this.orderService.updateStatus(id, dto);

    return {
      message: 'Order updated successfully',
      success: true,
      data: OrderResponseDto.fromEntity(updated),
    };
  }
}
