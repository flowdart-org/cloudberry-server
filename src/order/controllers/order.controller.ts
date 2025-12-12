import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';

import {
  HttpPaginatedResponse,
  HttpResponse,
} from '@/common/dto/http-response.dto';
import { Role } from '@/common/enums/role.enum';
import { Roles } from '@/common/decorators/roles.decorator';
import { OrderService } from '@/order/services/order.service';
import { UserId } from '@/common/decorators/user-id.decorator';
import { UpdateOrderDto } from '@/order/dto/request/update-order.dto';
import { OrderResponseDto } from '@/order/dto/response/order.response.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { OrderPaginatedQueryDto } from '@/order/dto/request/order-paginated-query.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles(Role.USER)
  @ApiResponseWithType({ isArray: true }, OrderResponseDto)
  async findAllByUser(
    @UserId() userId: string,
    @Query() query: OrderPaginatedQueryDto,
  ): Promise<HttpPaginatedResponse<OrderResponseDto[]>> {
    const { orders } = await this.orderService.listByUser(userId, query);

    return {
      message: 'User orders retrieved successfully',
      success: true,
      data: orders.map(OrderResponseDto.fromEntity),
      limit: query.limit,
      page: query.page,
      total: orders.length,
    };
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true }, OrderResponseDto)
  async findAll(
    @Query() query: OrderPaginatedQueryDto,
  ): Promise<HttpPaginatedResponse<OrderResponseDto[]>> {
    const { page, limit } = query;

    const { orders, total } = await this.orderService.listAll(query);

    return {
      message: 'Orders retrieved successfully',
      success: true,
      data: orders.map(OrderResponseDto.fromEntity),
      limit,
      page,
      total,
    };
  }

  @Get(':id')
  @ApiResponseWithType({}, OrderResponseDto)
  @Roles(Role.USER, Role.ADMIN)
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

  @Patch(':id')
  @Roles(Role.ADMIN)
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

  // TODO: Implement order cancellation and return processes
}
