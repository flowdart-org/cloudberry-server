import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { HTTP_RESPONSE } from '@/common/types';
import { Role } from '@/common/enums/role.enum';
import { Roles } from '@/common/decorators/roles.decorator';
import { CategoryService } from '@/product/category/category.service';
import { CreateCategoryDto } from '@/product/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@/product/category/dto/update-category.dto';
import { CategoryResponseDto } from '@/product/category/dto/response/category-response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<HTTP_RESPONSE> {
    const data = await this._categoryService.create(createCategoryDto);
    return {
      data,
      success: true,
      message: 'Category created successfully',
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll(): Promise<HTTP_RESPONSE<CategoryResponseDto[]>> {
    const data = await this._categoryService.findAll();
    return {
      data,
      success: true,
      message: 'Categories retrieved successfully',
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(
    @Param('id') id: string,
  ): Promise<HTTP_RESPONSE<CategoryResponseDto>> {
    const data = await this._categoryService.findOne(id);
    return {
      data,
      success: true,
      message: 'Category retrieved successfully',
    };
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<HTTP_RESPONSE> {
    const data = await this._categoryService.update(id, updateCategoryDto);
    return {
      data,
      success: true,
      message: 'Category updated successfully',
    };
  }
}
