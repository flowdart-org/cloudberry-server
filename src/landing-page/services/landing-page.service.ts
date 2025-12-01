import { Inject, Injectable } from '@nestjs/common';

import { ProductService } from '@/product/product.service';
import { MediaService } from '@/media/services/media.service';
import { LandingPageDto } from '@/landing-page/dto/landing-page.dto';
import { CategoryService } from '@/product/category/category.service';
import { UpdateLandingPageDto } from '@/landing-page/dto/request/update-landing-page.dto';
import { ILandingPageRepository } from '@/landing-page/repositories/interfaces/landing-page.repository';

@Injectable()
export class LandingPageService {
  constructor(
    @Inject('LandingPageRepository')
    private readonly _landingPageRepository: ILandingPageRepository,
    private readonly _categoryService: CategoryService,
    private readonly _productService: ProductService,
    private readonly _mediaService: MediaService,
  ) {}

  async getLandingPage(): Promise<LandingPageDto> {
    const config = await this._landingPageRepository.get();

    if (!config)
      return LandingPageDto.fromEntity(
        {
          heroImage: null,
          heroTitle: null,
          heroSubtitle: null,
          sections: [],
          topCategoryIds: [],
          topProductIds: [],
        },
        [],
        [],
        null,
      );

    const topCategories = await Promise.all(
      config.topCategoryIds.map(
        async (id) => await this._categoryService.findOne(id),
      ),
    );

    const topProducts = await Promise.all(
      config.topProductIds.map(
        async (id) => await this._productService.findById(id),
      ),
    );

    const { readUrl } = this._mediaService.getHeroImageReadUrl();

    return LandingPageDto.fromEntity(
      config,
      topProducts,
      topCategories,
      readUrl,
    );
  }

  async updateLandingPage(dto: UpdateLandingPageDto): Promise<void> {
    await this._landingPageRepository.update(dto);
  }
}
