import { Category } from '@/product/category/entities/category.entity';

export class CategoryDto {
  this: void;
  public id: string;
  public name: string;
  public status: 'active' | 'inactive';
  public thumbnail: string;

  constructor(entity: Category, _productsCount: number, imageUrl: string) {
    this.id = entity.id;
    this.name = entity.name;
    this.status = entity.status;
    this.thumbnail = imageUrl;
  }
}
