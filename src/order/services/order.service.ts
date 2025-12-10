import { v4 as uuidv4 } from 'uuid';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { OrderDto } from '@/order/dto/order.dto';
import { Order } from '@/order/entities/order.entity';
import { OrderItemDto } from '@/order/dto/order-item.dto';
import { ProductService } from '@/product/product.service';
import { UserService } from '@/user/services/user.service';
import { CreateOrderDto } from '@/order/dto/create-order.dto';
import { VariantService } from '@/product/variant/variant.service';
import { UpdateOrderDto } from '@/order/dto/request/update-order.dto';
import { IOrderRepository } from '@/order/repositories/interfaces/order.repository';
import { OrderPaginatedQueryDto } from '@/order/dto/request/order-paginated-query.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository')
    private readonly _orderRepository: IOrderRepository,
    private readonly _userService: UserService,
    private readonly _productService: ProductService,
    private readonly _variantService: VariantService,
  ) {}

  public async create(dto: CreateOrderDto): Promise<OrderDto> {
    const id = uuidv4();
    const orderNumber = this.generateOrderNumber();

    for (const item of dto.items) {
      const product = await this._productService.findById(item.productId);

      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }

      let variantStock: number | null = null;

      if (item.variantId) {
        const variant = product.variants.find((v) => v.id === item.variantId);
        if (!variant)
          throw new BadRequestException(`Variant not found for product`);

        variantStock = variant.stock;

        if (variantStock < item.quantity) {
          throw new BadRequestException(
            `Not enough stock for variant ${product.name}. Available: ${variantStock}`,
          );
        }
      }
    }

    // -----------------------------------------
    // 🛒 2. Build order entity
    // -----------------------------------------
    const entity = new Order({
      id,
      orderNumber,
      userId: dto.userId,
      subtotal: dto.subtotal,
      shippingCharge: dto.shippingCharge ?? 0,
      discount: dto.discount ?? 0,
      total: dto.total,
      items: dto.items,
      metadata: dto.metadata ?? null,
      paymentMethod: dto.paymentMethod ?? null,
      paymentStatus: dto.paymentStatus ?? 'pending',
      orderStatus: dto.orderStatus ?? 'pending',
      shippingAddressJson: dto.shippingAddressJson ?? null,
      addressLine1: dto.addressLine1 ?? null,
      addressLine2: dto.addressLine2 ?? null,
      city: dto.city ?? null,
      state: dto.state ?? null,
      country: dto.country ?? null,
      postalCode: dto.postalCode ?? null,
      addressLabel: dto.addressLabel ?? null,
      recipientName: dto.recipientName ?? null,
      recipientPhone: dto.recipientPhone ?? null,
      isDeleted: false,
    });

    const order = await this._orderRepository.create(entity);

    // -----------------------------------------
    // 📉 3. Reduce stock after order creation
    // -----------------------------------------
    for (const item of dto.items) {
      await this._productService.reduceStock(item);
    }

    const user = await this._userService.findById(order.userId);

    const items = await Promise.all(
      order.items.map(async (i) => {
        const product = await this._productService.findById(i.productId);
        const variant = await this._variantService.findById(i.variantId);
        return OrderItemDto.fromEntity(i, product, variant);
      }),
    );

    return OrderDto.fromEntity(order, user, items);
  }

  public async listAll(
    query: OrderPaginatedQueryDto,
  ): Promise<{ orders: OrderDto[]; total: number }> {
    const orderEntity = await this._orderRepository.findAll(query);

    const orders = await Promise.all(
      orderEntity.map(async (o) => {
        const user = await this._userService.findById(o.userId);

        const items = await Promise.all(
          o.items.map(async (i) => {
            const product = await this._productService.findById(i.productId);
            const variant = await this._variantService.findById(i.variantId);
            return OrderItemDto.fromEntity(i, product, variant);
          }),
        );

        return OrderDto.fromEntity(o, user, items);
      }),
    );

    return {
      orders,
      total: await this._orderRepository.countAll(),
    };
  }

  public async findById(id: string): Promise<OrderDto> {
    const order = await this._orderRepository.findById(id);
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    const user = await this._userService.findById(order.userId);

    const items = await Promise.all(
      order.items.map(async (i) => {
        const product = await this._productService.findById(i.productId);
        const variant = await this._variantService.findById(i.variantId);
        return OrderItemDto.fromEntity(i, product, variant);
      }),
    );

    return OrderDto.fromEntity(order, user, items);
  }

  public async findByOrderNumber(orderNumber: string): Promise<OrderDto> {
    const orderEntity =
      await this._orderRepository.findByOrderNumber(orderNumber);
    if (!orderEntity)
      throw new NotFoundException(`Order ${orderNumber} not found`);

    const user = await this._userService.findById(orderEntity.userId);

    const items = await Promise.all(
      orderEntity.items.map(async (i) => {
        const product = await this._productService.findById(i.productId);
        const variant = await this._variantService.findById(i.variantId);
        return OrderItemDto.fromEntity(i, product, variant);
      }),
    );

    return OrderDto.fromEntity(orderEntity, user, items);
  }

  public async listByUser(
    userId: string,
    query: OrderPaginatedQueryDto,
  ): Promise<{ orders: OrderDto[] }> {
    const orderEntities = await this._orderRepository.listByUser(userId, query);

    const orders = await Promise.all(
      orderEntities.map(async (o) => {
        const user = await this._userService.findById(o.userId);

        const items = await Promise.all(
          o.items.map(async (i) => {
            const product = await this._productService.findById(i.productId);
            const variant = await this._variantService.findById(i.variantId);
            return OrderItemDto.fromEntity(i, product, variant);
          }),
        );

        return OrderDto.fromEntity(o, user, items);
      }),
    );

    return {
      orders,
    };
  }

  public async update(id: string, payload: Partial<Order>): Promise<OrderDto> {
    const existing = await this._orderRepository.findById(id);

    if (!existing) throw new NotFoundException(`Order ${id} not found`);

    const updatableFields: Partial<Order> = {
      subtotal: payload.subtotal ?? existing.subtotal,
      shippingCharge: payload.shippingCharge ?? existing.shippingCharge,
      tax: payload.tax ?? existing.tax,
      discount: payload.discount ?? existing.discount,
      total: payload.total ?? existing.total,

      // Order status controls
      paymentStatus: payload.paymentStatus ?? existing.paymentStatus,
      orderStatus: payload.orderStatus ?? existing.orderStatus,

      // Address
      shippingAddressJson:
        payload.shippingAddressJson ?? existing.shippingAddressJson,
      addressLine1: payload.addressLine1 ?? existing.addressLine1,
      addressLine2: payload.addressLine2 ?? existing.addressLine2,
      city: payload.city ?? existing.city,
      state: payload.state ?? existing.state,
      country: payload.country ?? existing.country,
      postalCode: payload.postalCode ?? existing.postalCode,
      addressLabel: payload.addressLabel ?? existing.addressLabel,
      recipientName: payload.recipientName ?? existing.recipientName,
      recipientPhone: payload.recipientPhone ?? existing.recipientPhone,

      // Metadata
      metadata: payload.metadata ?? existing.metadata,
      items: payload.items ?? existing.items,
    };

    const updated = existing.with(updatableFields);

    const data = await this._orderRepository.update(id, updated);

    const user = await this._userService.findById(data.userId);

    const items = await Promise.all(
      data.items.map(async (i) => {
        const product = await this._productService.findById(i.productId);
        const variant = await this._variantService.findById(i.variantId);
        return OrderItemDto.fromEntity(i, product, variant);
      }),
    );

    return OrderDto.fromEntity(data, user, items);
  }

  public async updateStatus(
    id: string,
    payload: UpdateOrderDto,
  ): Promise<OrderDto> {
    const existing = await this._orderRepository.findById(id);

    if (!existing) throw new NotFoundException(`Order ${id} not found`);

    const data = await this._orderRepository.update(id, {
      orderStatus: payload.status ?? existing.orderStatus,
    });

    const user = await this._userService.findById(data.userId);

    const items = await Promise.all(
      data.items.map(async (i) => {
        const product = await this._productService.findById(i.productId);
        const variant = await this._variantService.findById(i.variantId);
        return OrderItemDto.fromEntity(i, product, variant);
      }),
    );

    return OrderDto.fromEntity(data, user, items);
  }

  // public async cancel(id: string, reason?: string): Promise<Order> {
  //   const existing = await this.findById(id);
  //   const cancelled = existing.with({
  //     orderStatus: 'cancelled',
  //     cancelledAt: new Date(),
  //     cancelReason: reason ?? null,
  //   });
  //   return this._orderRepository.update(cancelled);
  // }

  private generateOrderNumber(): string {
    // simple order number generator — change to your format if needed
    const now = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `ORD-${now}-${rand}`;
  }
}
