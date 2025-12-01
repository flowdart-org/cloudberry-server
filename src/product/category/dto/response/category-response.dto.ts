import { CategoryDto } from '@/product/category/dto/category.dto';

export class CategoryResponseDto {
  public id: string;
  public name: string;
  public status: 'active' | 'inactive';
  public thumbnail: string;

  static fromDto(this: void, entity: CategoryDto): CategoryResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      status: entity.status,
      thumbnail: entity.thumbnail,
    };
  }
}
