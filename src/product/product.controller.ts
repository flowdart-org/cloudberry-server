import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import type { HTTP_RESPONSE } from '@/common/types';
import { ProductService } from '@/product/product.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { CreateProductDto } from '@/product/dto/request/create-product.dto';
import { UpdateProductDto } from '@/product/dto/request/update-product.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { ProductResponseDto } from '@/product/dto/response/product-response.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, ProductResponseDto)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<HTTP_RESPONSE<ProductResponseDto>> {
    const data = await this.productService.create(createProductDto);

    return {
      success: true,
      message: 'Product created successfully',
      data: ProductResponseDto.fromDto(data),
    };
  }

  @Get('feed')
  @Public()
  @Roles(Role.USER)
  @ApiResponseWithType({ isArray: true }, ProductResponseDto)
  async findFeed(): Promise<HTTP_RESPONSE<ProductResponseDto[]>> {
    const data = await this.productService.findFeed();

    return {
      success: true,
      message: 'Products fetched successfully',
      data: data.map(ProductResponseDto.fromDto),
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true }, ProductResponseDto)
  async findAll(): Promise<HTTP_RESPONSE<ProductResponseDto[]>> {
    const data = await this.productService.findAll();

    return {
      success: true,
      message: 'Products fetched successfully',
      data: data.map(ProductResponseDto.fromDto),
    };
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiResponseWithType({}, ProductResponseDto)
  async findOne(
    @Param('id') id: string,
  ): Promise<HTTP_RESPONSE<ProductResponseDto>> {
    const data = await this.productService.findById(id);

    return {
      message: 'Product fetched successfully',
      success: true,
      data: ProductResponseDto.fromDto(data),
    };
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, ProductResponseDto)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<HTTP_RESPONSE<ProductResponseDto>> {
    const data = await this.productService.update(id, updateProductDto);

    return {
      success: true,
      message: 'Product updated successfully',
      data: ProductResponseDto.fromDto(data),
    };
  }
}
