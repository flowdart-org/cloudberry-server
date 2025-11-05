export class ProductVariant {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly size: string,
    public readonly stock: number,
    public readonly sku: string | null,
    public readonly isDeleted: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
