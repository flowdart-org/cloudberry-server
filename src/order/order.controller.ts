import { Controller, Get, Body, Patch, Param } from '@nestjs/common';

import { OrderService } from '@/order/order.service';
import { UpdateOrderDto } from '@/order/dto/update-order.dto';
import { UserId } from '@/common/decorators/user-id.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/user')
  findAllByUser(@UserId() userId: string) {
    return this.orderService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }
}
