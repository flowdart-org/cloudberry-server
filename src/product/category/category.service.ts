import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { MediaService } from '@/media/media.service';
import { CreateCategoryDto } from '@/product/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@/product/category/dto/update-category.dto';
import { CategoryResponseDto } from '@/product/category/dto/response/category-response.dto';
import type { ICategoryRepository } from '@/product/category/repositories/interfaces/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _mediaService: MediaService,
  ) {}
  async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    const doc = await this._categoryRepository.create(dto);

    return new CategoryResponseDto(
      doc,
      0,
      this._mediaService.getCategoryReadUrl(doc.id),
    );
  }

  async findAll(): Promise<CategoryResponseDto[]> {
    const data = await this._categoryRepository.findAll();

    return data.length
      ? data.map(
          (d) =>
            new CategoryResponseDto(
              d,
              0,
              this._mediaService.getCategoryReadUrl(d.id),
            ),
        )
      : [];
  }

  async findAllActive(): Promise<CategoryResponseDto[]> {
    const data = await this._categoryRepository.findAllActive();

    return data.length
      ? data.map(
          (d) =>
            new CategoryResponseDto(
              d,
              0,
              this._mediaService.getCategoryReadUrl(d.id),
            ),
        )
      : [];
  }

  async findOne(id: string): Promise<CategoryResponseDto> {
    const doc = await this._categoryRepository.findById(id);

    if (!doc) throw new NotFoundException('Category not found');

    return new CategoryResponseDto(
      doc,
      0,
      this._mediaService.getCategoryReadUrl(doc.id),
    );
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const existingCategory = await this._categoryRepository.findById(id);

    if (!existingCategory) throw new NotFoundException('Category not found');

    const updatedCategory = await this._categoryRepository.update(id, {
      ...existingCategory,
      ...updateCategoryDto,
    });

    return new CategoryResponseDto(
      updatedCategory,
      0,
      this._mediaService.getCategoryReadUrl(updatedCategory.id),
    );
  }
}
