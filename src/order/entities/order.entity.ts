export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type OrderItem = {
  productId: string;
  variantId?: string | null;
  name: string;
  sku?: string | null;
  price: number;
  quantity: number;
  subtotal: number;
  metadata?: Record<string, unknown> | null;
};

export type OrderItems = OrderItem[];

export class Order {
  // core fields
  public readonly id: string;
  public readonly orderNumber: string;
  public readonly userId: string;
  public readonly placedAt: Date;
  public readonly updatedAt: Date | null;
  public readonly deliveredAt?: Date | null;
  public readonly cancelledAt?: Date | null;

  // financials
  public readonly subtotal: number;
  public readonly shippingCharge: number;
  public readonly tax: number;
  public readonly discount: number;
  public readonly total: number;

  // items & metadata
  public readonly items: OrderItems;
  public readonly metadata?: Record<string, unknown> | null;

  // payment & order status
  public readonly paymentMethod?: string | null;
  public readonly paymentStatus: PaymentStatus;

  public readonly orderStatus: OrderStatus;

  // address
  public readonly shippingAddressJson?: Record<string, unknown> | null;
  public readonly addressLine1?: string | null;
  public readonly addressLine2?: string | null;
  public readonly city?: string | null;
  public readonly state?: string | null;
  public readonly country?: string | null;
  public readonly postalCode?: string | null;
  public readonly addressLabel?: string | null;
  public readonly recipientName?: string | null;
  public readonly recipientPhone?: string | null;

  // delivery
  public readonly courierName?: string | null;
  public readonly trackingNumber?: string | null;
  public readonly trackingUrl?: string | null;

  // cancellation/refund
  public readonly cancelReason?: string | null;
  public readonly refundAmount?: number | null;

  public readonly isDeleted: boolean;

  constructor(props: {
    id: string;
    orderNumber: string;
    userId: string;
    placedAt?: Date;
    updatedAt?: Date | null;
    deliveredAt?: Date | null;
    cancelledAt?: Date | null;

    subtotal: number;
    shippingCharge?: number;
    tax?: number;
    discount?: number;
    total: number;

    items: OrderItems;
    metadata?: Record<string, unknown> | null;

    paymentMethod?: string | null;
    paymentStatus?: PaymentStatus;
    orderStatus?: OrderStatus;

    shippingAddressJson?: Record<string, unknown> | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    postalCode?: string | null;
    addressLabel?: string | null;
    recipientName?: string | null;
    recipientPhone?: string | null;

    courierName?: string | null;
    trackingNumber?: string | null;
    trackingUrl?: string | null;

    cancelReason?: string | null;
    refundAmount?: number | null;

    isDeleted?: boolean;
  }) {
    this.id = props.id;
    this.orderNumber = props.orderNumber;
    this.userId = props.userId;
    this.placedAt = props.placedAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
    this.deliveredAt = props.deliveredAt ?? null;
    this.cancelledAt = props.cancelledAt ?? null;

    this.subtotal = props.subtotal;
    this.shippingCharge = props.shippingCharge ?? 0;
    this.tax = props.tax ?? 0;
    this.discount = props.discount ?? 0;
    this.total = props.total;

    this.items = props.items;
    this.metadata = props.metadata ?? null;

    this.paymentMethod = props.paymentMethod ?? null;
    this.paymentStatus = props.paymentStatus ?? 'pending';
    this.orderStatus = props.orderStatus ?? 'pending';

    this.shippingAddressJson = props.shippingAddressJson ?? null;
    this.addressLine1 = props.addressLine1 ?? null;
    this.addressLine2 = props.addressLine2 ?? null;
    this.city = props.city ?? null;
    this.state = props.state ?? null;
    this.country = props.country ?? null;
    this.postalCode = props.postalCode ?? null;
    this.addressLabel = props.addressLabel ?? null;
    this.recipientName = props.recipientName ?? null;
    this.recipientPhone = props.recipientPhone ?? null;

    this.courierName = props.courierName ?? null;
    this.trackingNumber = props.trackingNumber ?? null;
    this.trackingUrl = props.trackingUrl ?? null;

    this.cancelReason = props.cancelReason ?? null;
    this.refundAmount = props.refundAmount ?? null;

    this.isDeleted = props.isDeleted ?? false;
  }

  public with(patch: Partial<Order>): Order {
    return new Order({
      id: patch.id ?? this.id,
      orderNumber: patch.orderNumber ?? this.orderNumber,
      userId: patch.userId ?? this.userId,
      placedAt: patch.placedAt ?? this.placedAt,
      updatedAt: patch.updatedAt ?? this.updatedAt,
      deliveredAt: patch.deliveredAt ?? this.deliveredAt,
      cancelledAt: patch.cancelledAt ?? this.cancelledAt,

      subtotal: patch.subtotal ?? this.subtotal,
      shippingCharge: patch.shippingCharge ?? this.shippingCharge,
      tax: patch.tax ?? this.tax,
      discount: patch.discount ?? this.discount,
      total: patch.total ?? this.total,

      items: patch.items ?? this.items,
      metadata: patch.metadata ?? this.metadata,

      paymentMethod: patch.paymentMethod ?? this.paymentMethod,
      paymentStatus: patch.paymentStatus ?? this.paymentStatus,
      orderStatus: patch.orderStatus ?? this.orderStatus,

      shippingAddressJson:
        patch.shippingAddressJson ?? this.shippingAddressJson,
      addressLine1: patch.addressLine1 ?? this.addressLine1,
      addressLine2: patch.addressLine2 ?? this.addressLine2,
      city: patch.city ?? this.city,
      state: patch.state ?? this.state,
      country: patch.country ?? this.country,
      postalCode: patch.postalCode ?? this.postalCode,
      addressLabel: patch.addressLabel ?? this.addressLabel,
      recipientName: patch.recipientName ?? this.recipientName,
      recipientPhone: patch.recipientPhone ?? this.recipientPhone,

      courierName: patch.courierName ?? this.courierName,
      trackingNumber: patch.trackingNumber ?? this.trackingNumber,
      trackingUrl: patch.trackingUrl ?? this.trackingUrl,

      cancelReason: patch.cancelReason ?? this.cancelReason,
      refundAmount: patch.refundAmount ?? this.refundAmount,

      isDeleted: patch.isDeleted ?? this.isDeleted,
    });
  }
}
