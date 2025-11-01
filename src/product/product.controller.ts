import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import type { HTTP_RESPONSE } from '@/common/types';
import { ProductService } from '@/product/product.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateProductDto } from '@/product/dto/request/create-product.dto';
import { UpdateProductDto } from '@/product/dto/request/update-product.dto';
import { ProductResponseDto } from '@/product/dto/response/product-response.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, ProductResponseDto)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('feed')
  @Roles(Role.USER)
  @ApiResponseWithType({ isArray: true }, ProductResponseDto)
  findFeed() {
    return this.productService.findAll();
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true }, ProductResponseDto)
  async findAll(): Promise<HTTP_RESPONSE<ProductResponseDto[]>> {
    const data = await this.productService.findAll();

    return {
      success: true,
      message: 'Products fetched successfully',
      data,
    };
  }

  @Get(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiResponseWithType({}, ProductResponseDto)
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, ProductResponseDto)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }
}
