export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly categoryId: string,
    public readonly price: number,
    public readonly discountPercent: number | null,
    public readonly finalPrice: number,
    public readonly tryOn: boolean,
    public readonly status: 'active' | 'inactive',
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
