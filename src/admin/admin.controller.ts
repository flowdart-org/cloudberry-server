import type { Request } from 'express';
import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';

import { HTTP_RESPONSE } from '@/common/types';
import { AdminService } from '@/admin/admin.service';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { AdminResponseDto } from '@/admin/dto/response/admin-response.dto';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly _adminService: AdminService) {}

  @Get('/me')
  @Roles(Role.ADMIN)
  @ApiResponseWithType({}, AdminResponseDto)
  async getAdmin(@Req() req: Request): Promise<HTTP_RESPONSE> {
    const userId = req.user && req.user['sub'];

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const admin = await this._adminService.findById(userId);

    return {
      message: 'Admin fetched successfully',
      data: admin,
      success: true,
    };
  }
}
