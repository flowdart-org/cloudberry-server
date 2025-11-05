import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { HTTP_RESPONSE } from '@/common/types';
import { Role } from '@/common/enums/role.enum';
import { Roles } from '@/common/decorators/roles.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { CategoryService } from '@/product/category/category.service';
import { CreateCategoryDto } from '@/product/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@/product/category/dto/update-category.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { CategoryResponseDto } from '@/product/category/dto/response/category-response.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, CategoryResponseDto)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<HTTP_RESPONSE<CategoryResponseDto>> {
    const data = await this._categoryService.create(createCategoryDto);

    return {
      success: true,
      message: 'Category created successfully',
      data,
    };
  }

  @Get()
  @Public()
  @ApiResponseWithType({}, CategoryResponseDto)
  async findAllActive(): Promise<HTTP_RESPONSE<CategoryResponseDto[]>> {
    const data = await this._categoryService.findAllActive();

    return {
      success: true,
      message: 'Categories retrieved successfully',
      data,
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, CategoryResponseDto)
  async findAll(): Promise<HTTP_RESPONSE<CategoryResponseDto[]>> {
    const data = await this._categoryService.findAllActive();

    return {
      success: true,
      message: 'Categories retrieved successfully',
      data,
    };
  }

  @Get(':id')
  @ApiResponseWithType({}, CategoryResponseDto)
  @Roles(Role.ADMIN)
  async findOne(
    @Param('id') id: string,
  ): Promise<HTTP_RESPONSE<CategoryResponseDto>> {
    const data = await this._categoryService.findOne(id);

    return {
      success: true,
      message: 'Category retrieved successfully',
      data,
    };
  }

  @Patch(':id')
  @ApiResponseWithType({}, CategoryResponseDto)
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<HTTP_RESPONSE<CategoryResponseDto>> {
    const data = await this._categoryService.update(id, updateCategoryDto);

    return {
      success: true,
      message: 'Category updated successfully',
      data,
    };
  }
}
