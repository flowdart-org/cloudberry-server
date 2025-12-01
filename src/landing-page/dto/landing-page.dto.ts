import { ProductDto } from '@/product/dto/product.dto';
import { CategoryDto } from '@/product/category/dto/category.dto';
import { LandingPage } from '@/landing-page/entities/landing-page.entity';

export class LandingPageDto {
  hero: {
    image: string | null;
    title: string | null;
    subtitle: string | null;
  };

  topCategories: CategoryDto[];

  topProducts: ProductDto[];

  sections: any[];

  static fromEntity(
    entity: Omit<LandingPage, 'id' | 'createdAt' | 'updatedAt'>,
    topProducts: ProductDto[],
    topCategories: CategoryDto[],
    heroImageUrl: string | null,
  ): LandingPageDto {
    return {
      hero: {
        image: heroImageUrl,
        title: entity.heroTitle,
        subtitle: entity.heroSubtitle,
      },
      topCategories: topCategories ?? [],
      topProducts: topProducts ?? [],
      sections: entity.sections ?? [],
    };
  }
}
