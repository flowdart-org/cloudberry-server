import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { Role } from '@/common/enums/role.enum';
import { UserService } from '@/user/user.service';
import type { HTTP_RESPONSE, RequestUser } from '@/common/types';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserResponseDto } from '@/user/dto/response/user-response.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { UpdateStatusUserDto } from '@/user/dto/update-status-user.dto';
import { ReqUser } from '@/common/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('me')
  @Roles(Role.USER)
  @ApiResponseWithType({}, UserResponseDto)
  async me(@Req() req: Request): Promise<HTTP_RESPONSE> {
    const userId = req.user['id'];

    if (!userId) throw new UnauthorizedException('User not authenticated');

    const data = await this._userService.findById(userId);

    if (!data) throw new UnauthorizedException('User not found');

    return {
      success: true,
      message: 'User profile fetched successfully',
      data,
    };
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType({ isArray: true }, UserResponseDto)
  async findAll(): Promise<HTTP_RESPONSE<UserResponseDto[]>> {
    const docs = await this._userService.findAll();

    const data = docs.map((doc) => new UserResponseDto(doc));

    return {
      success: true,
      message: 'Users fetched successfully',
      data,
    };
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UserResponseDto)
  async findOne(@Param('id') id: string) {
    const doc = await this._userService.findById(id);

    if (!doc) throw new UnauthorizedException('User not found');

    return new UserResponseDto(doc);
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
    console.log('userUpdate', dto);

    if (!userId) throw new UnauthorizedException('User not authenticated');

    const data = await this._userService.updateStatus(userId, dto);

    return {
      success: true,
      message: 'User profile rahil successfully',
      data,
    };
  }
}
