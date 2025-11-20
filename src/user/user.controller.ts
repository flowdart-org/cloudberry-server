import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import type { Request } from 'express';

import { Role } from '@/common/enums/role.enum';
import { UserService } from '@/user/user.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { ReqUser } from '@/common/decorators/user.decorator';
import { UserId } from '@/common/decorators/user-id.decorator';
import type { HTTP_RESPONSE, RequestUser } from '@/common/types';
import { UpdateUserDto } from '@/user/dto/request/update-user.dto';
import { UserResponseDto } from '@/user/dto/response/user-response.dto';
import { UpdateStatusUserDto } from '@/user/dto/request/update-status-user.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { UserPaginatedQueryDto } from '@/user/dto/request/user-paginated-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('me')
  @Roles(Role.USER)
  @ApiResponseWithType({}, UserResponseDto)
  async me(@UserId() userId: string): Promise<HTTP_RESPONSE> {
    const data = await this._userService.findById(userId);

    return {
      success: true,
      message: 'User profile fetched successfully',
      data,
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true }, UserResponseDto)
  async find(
    @Query() query: UserPaginatedQueryDto,
  ): Promise<HTTP_RESPONSE<UserResponseDto[]>> {
    const docs = await this._userService.find(query);

    return {
      success: true,
      message: 'Users fetched successfully',
      data: docs.map(UserResponseDto.fromEntity),
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UserResponseDto)
  async findOne(
    @Param('id') id: string,
  ): Promise<HTTP_RESPONSE<UserResponseDto>> {
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
    @Req() req: Request,
    @ReqUser() user: RequestUser,
    @Body() dto: UpdateUserDto,
  ): Promise<HTTP_RESPONSE> {
    const userId = req.user['id'];

    console.log('userUpdate', dto, userId, user);

    if (!userId) throw new UnauthorizedException('User not authenticated');

    const data = await this._userService.update(userId, dto);

    return {
      success: true,
      message: 'User profile rahil successfully',
      data,
    };
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UserResponseDto)
  async updateStatus(
    @Param('id') userId: string,
    @Body() dto: UpdateStatusUserDto,
  ): Promise<HTTP_RESPONSE> {
    const data = await this._userService.updateStatus(userId, dto);

    return {
      success: true,
      message: 'User profile rahil successfully',
      data,
    };
  }
}
