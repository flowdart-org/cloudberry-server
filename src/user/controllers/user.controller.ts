import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  Post,
} from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import { UserService } from '@/user/services/user.service';
import { Roles } from '@/common/decorators/roles.decorator';
import {
  HttpPaginatedResponse,
  HttpResponse,
} from '@/common/dto/http-response.dto';
import { UserId } from '@/common/decorators/user-id.decorator';
import { AddressService } from '@/user/services/address.service';
import { UpdateUserDto } from '@/user/dto/request/update-user.dto';
import { UserResponseDto } from '@/user/dto/response/user-response.dto';
import { UpdateAddressDto } from '@/user/dto/request/update-address.dto';
import { CreateAddressDto } from '@/user/dto/request/create-address.dto';
import { AddressResponseDto } from '@/user/dto/response/address-response.dto';
import { UpdateStatusUserDto } from '@/user/dto/request/update-status-user.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { UserPaginatedQueryDto } from '@/user/dto/request/user-paginated-query.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _addressService: AddressService,
  ) {}

  @Get('me')
  @Roles(Role.USER)
  @ApiResponseWithType({}, UserResponseDto)
  async me(@UserId() userId: string): Promise<HttpResponse<UserResponseDto>> {
    const data = await this._userService.findById(userId);

    return {
      success: true,
      message: 'User profile fetched successfully',
      data: UserResponseDto.fromEntity(data),
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true }, UserResponseDto)
  async find(
    @Query() query: UserPaginatedQueryDto,
  ): Promise<HttpPaginatedResponse<UserResponseDto[]>> {
    const docs = await this._userService.find(query);

    return {
      success: true,
      message: 'Users fetched successfully',
      data: docs.map(UserResponseDto.fromEntity),
      // TODO: implement total count
      total: 0,
      page: query.page,
      limit: query.limit,
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UserResponseDto)
  async findOne(
    @Param('id') id: string,
  ): Promise<HttpResponse<UserResponseDto>> {
    const data = await this._userService.findById(id);

    return {
      message: 'User fetched successfully',
      success: true,
      data: UserResponseDto.fromEntity(data),
    };
  }

  @Patch()
  @Roles(Role.USER)
  @ApiResponseWithType({}, UserResponseDto)
  async update(
    @UserId() userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<HttpResponse<UserResponseDto>> {
    const data = await this._userService.update(userId, dto);

    return {
      success: true,
      message: 'User profile rahil successfully',
      data: UserResponseDto.fromEntity(data),
    };
  }

  @Post('address')
  @Roles(Role.USER)
  @ApiResponseWithType({}, AddressResponseDto)
  async createAddress(
    @UserId() userId: string,
    @Body() dto: CreateAddressDto,
  ): Promise<HttpResponse<AddressResponseDto>> {
    const data = await this._addressService.create(userId, dto);

    return {
      success: true,
      message: 'User address created successfully',
      data: AddressResponseDto.fromEntity(data),
    };
  }

  @Patch('address/:id')
  @Roles(Role.USER)
  @ApiResponseWithType({}, UserResponseDto)
  async updateAddress(
    @UserId() userId: string,
    @Body() dto: UpdateAddressDto,
    @Param('id') addressId: string,
  ): Promise<HttpResponse<AddressResponseDto>> {
    const data = await this._addressService.update(addressId, userId, dto);

    return {
      success: true,
      message: 'User address updated successfully',
      data: AddressResponseDto.fromEntity(data),
    };
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UserResponseDto)
  async updateStatus(
    @Param('id') userId: string,
    @Body() dto: UpdateStatusUserDto,
  ): Promise<HttpResponse<UserResponseDto>> {
    const data = await this._userService.updateStatus(userId, dto);

    return {
      success: true,
      message: 'User profile rahil successfully',
      data: UserResponseDto.fromEntity(data),
    };
  }
}
