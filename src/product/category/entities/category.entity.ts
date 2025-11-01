export class Category {
  constructor(
    public id: string,
    public name: string,
    public status: 'active' | 'inactive',
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
