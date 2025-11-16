import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@/order/dto/create-order.dto';
import { UpdateOrderDto } from '@/order/dto/update-order.dto';

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findAllByUser(userId: string) {
    return `This action returns all order for a specific user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
