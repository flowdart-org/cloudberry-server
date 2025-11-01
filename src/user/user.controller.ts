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

import { HTTP_RESPONSE } from '@/common/types';
import { Role } from '@/common/enums/role.enum';
import { UserService } from '@/user/user.service';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';
import { UserResponseDto } from '@/user/dto/response/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get('/me')
  @Roles(Role.USER)
  @ApiResponseWithType({}, UserResponseDto)
  async me(@Req() req: Request): Promise<HTTP_RESPONSE> {
    const userId = req.user && req.user['sub'];

    if (!userId) throw new UnauthorizedException('User not authenticated');

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
  findAll() {
    return this._userService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, UserResponseDto)
  findOne(@Param('id') id: string) {
    return this._userService.findById(id);
  }

  @Patch()
  @Roles(Role.USER)
  @ApiResponseWithType({}, UserResponseDto)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user && req.user['sub'];

    if (!userId) throw new UnauthorizedException('User not authenticated');

    return this._userService.update(userId, updateUserDto);
  }
}
