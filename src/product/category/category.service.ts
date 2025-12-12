import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { MediaService } from '@/media/services/media.service';
import { CategoryDto } from '@/product/category/dto/category.dto';
import { CreateCategoryDto } from '@/product/category/dto/request/create-category.dto';
import { UpdateCategoryDto } from '@/product/category/dto/request/update-category.dto';
import { CategoryPaginatedQueryDto } from '@/product/category/dto/request/category-paginated-query.dto';
import type { ICategoryRepository } from '@/product/category/repositories/interfaces/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _mediaService: MediaService,
  ) {}

  async create(dto: CreateCategoryDto): Promise<CategoryDto> {
    const doc = await this._categoryRepository.create(dto);

    return new CategoryDto(
      doc,
      0,
      this._mediaService.getCategoryReadUrl(doc.id).readUrl,
    );
  }

  async findAll(query: CategoryPaginatedQueryDto): Promise<{
    items: CategoryDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { search, status, limit, page } = query;

    const skip = (page - 1) * limit;

    const docs = await this._categoryRepository.findAll({
      skip,
      take: limit,
      search,
      status,
    });

    const total = await this._categoryRepository.count({
      search,
      status,
    });

    const items = docs.map(
      (d) =>
        new CategoryDto(
          d,
          0,
          this._mediaService.getCategoryReadUrl(d.id).readUrl,
        ),
    );

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAllActive(): Promise<CategoryDto[]> {
    const data = await this._categoryRepository.findAllActive();

    return data.length
      ? data.map(
          (d) =>
            new CategoryDto(
              d,
              0,
              this._mediaService.getCategoryReadUrl(d.id).readUrl,
            ),
        )
      : [];
  }

  async findOne(id: string): Promise<CategoryDto> {
    const doc = await this._categoryRepository.findById(id);

    if (!doc) throw new NotFoundException('Category not found');

    return new CategoryDto(
      doc,
      0,
      this._mediaService.getCategoryReadUrl(doc.id).readUrl,
    );
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const existingCategory = await this._categoryRepository.findById(id);

    if (!existingCategory) throw new NotFoundException('Category not found');

    const updatedCategory = await this._categoryRepository.update(id, {
      ...existingCategory,
      ...updateCategoryDto,
    });

    return new CategoryDto(
      updatedCategory,
      0,
      this._mediaService.getCategoryReadUrl(updatedCategory.id).readUrl,
    );
  }
}
