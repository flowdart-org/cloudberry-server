import { ApiProperty } from '@nestjs/swagger';

export class SalesOverviewItemDto {
  @ApiProperty()
  month!: string;

  @ApiProperty()
  amount!: number;
}

export class TopSellingProductDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  sold!: number;

  @ApiProperty()
  revenue!: number;
}

export class RecentOrderDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  customerName!: string;

  @ApiProperty()
  total!: number;

  @ApiProperty()
  date!: Date;

  @ApiProperty()
  status!: string;
}

export class DashboardAnalyticsResponseDto {
  @ApiProperty()
  totalRevenue!: number;

  @ApiProperty()
  totalOrders!: number;

  @ApiProperty()
  totalProducts!: number;

  @ApiProperty()
  totalCustomers!: number;

  @ApiProperty({ type: [SalesOverviewItemDto] })
  salesOverview!: SalesOverviewItemDto[];

  @ApiProperty({ type: [TopSellingProductDto] })
  topSellingProducts!: TopSellingProductDto[];

  @ApiProperty({ type: [RecentOrderDto] })
  recentOrders!: RecentOrderDto[];
}