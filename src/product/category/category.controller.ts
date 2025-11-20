import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  HttpPaginatedResponse,
  HttpResponse,
} from '@/common/dto/http-response.dto';
import { Role } from '@/common/enums/role.enum';
import { Roles } from '@/common/decorators/roles.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { CategoryService } from '@/product/category/category.service';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { UpdateCategoryDto } from '@/product/category/dto/request/update-category.dto';
import { CreateCategoryDto } from '@/product/category/dto/request/create-category.dto';
import { CategoryResponseDto } from '@/product/category/dto/response/category-response.dto';
import { CategoryPaginatedQueryDto } from '@/product/category/dto/request/category-paginated-query.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, CategoryResponseDto)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<HttpResponse<CategoryResponseDto>> {
    const data = await this._categoryService.create(createCategoryDto);

    return {
      success: true,
      message: 'Category created successfully',
      data,
    };
  }

  @Get('all')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true, pagination: true }, CategoryResponseDto)
  async findAll(
    @Query() query: CategoryPaginatedQueryDto,
  ): Promise<HttpPaginatedResponse<CategoryResponseDto[]>> {
    const { items, total, page, limit } =
      await this._categoryService.findAll(query);

    return {
      success: true,
      message: 'Categories retrieved successfully',
      data: items,
      total,
      page,
      limit,
    };
  }

  @Get()
  @Public()
  @ApiResponseWithType({}, CategoryResponseDto)
  async findAllActive(): Promise<HttpResponse<CategoryResponseDto[]>> {
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
  ): Promise<HttpResponse<CategoryResponseDto>> {
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
  ): Promise<HttpResponse<CategoryResponseDto>> {
    const data = await this._categoryService.update(id, updateCategoryDto);

    return {
      success: true,
      message: 'Category updated successfully',
      data,
    };
  }
}
