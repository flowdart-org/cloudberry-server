import { ApiProperty } from '@nestjs/swagger';

import { LandingPageDto } from '@/landing-page/dto/landing-page.dto';
import { ProductDto } from '@/product/dto/product.dto';
import { CategoryDto } from '@/product/category/dto/category.dto';

export class LandingPageResponseDto {
  @ApiProperty()
  hero: {
    image: string | null;
    title: string | null;
    subtitle: string | null;
  };

  @ApiProperty({ type: [Object] })
  topCategories: CategoryDto[];

  @ApiProperty({ type: [Object] })
  topProducts: ProductDto[];

  @ApiProperty({ type: [Object] })
  sections: any[];

  static fromEntity(entity: LandingPageDto): LandingPageResponseDto {
    return {
      hero: entity.hero,
      topCategories: entity.topCategories ?? [],
      topProducts: entity.topProducts ?? [],
      sections: entity.sections ?? [],
    };
  }
}
