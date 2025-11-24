import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import { ProductService } from '@/product/product.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { HttpResponse } from '@/common/dto/http-response.dto';
import { CreateProductDto } from '@/product/dto/request/create-product.dto';
import { UpdateProductDto } from '@/product/dto/request/update-product.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { ProductResponseDto } from '@/product/dto/response/product-response.dto';
import { ProductPaginatedQueryDto } from '@/product/dto/request/product-paginated-query.dto';
import { ProductFeedPaginatedQueryDto } from '@/product/dto/request/product-feed-paginated-query.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, ProductResponseDto)
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<HttpResponse<ProductResponseDto>> {
    const data = await this.productService.create(createProductDto);

    return {
      success: true,
      message: 'Product created successfully',
      data: ProductResponseDto.fromDto(data),
    };
  }

  @Get('feed')
  @Public()
  @ApiResponseWithType({ isArray: true }, ProductResponseDto)
  async findFeed(
    @Query() query: ProductFeedPaginatedQueryDto,
  ): Promise<HttpResponse<ProductResponseDto[]>> {
    const data = await this.productService.findFeed(query);

    return {
      success: true,
      message: 'Products fetched successfully',
      data: data.map(ProductResponseDto.fromDto),
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true }, ProductResponseDto)
  async find(
    @Query() query: ProductPaginatedQueryDto,
  ): Promise<HttpResponse<ProductResponseDto[]>> {
    const data = await this.productService.find(query);

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
  ): Promise<HttpResponse<ProductResponseDto>> {
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
  ): Promise<HttpResponse<ProductResponseDto>> {
    const data = await this.productService.update(id, updateProductDto);

    return {
      success: true,
      message: 'Product updated successfully',
      data: ProductResponseDto.fromDto(data),
    };
  }
}
