import { Controller, Get } from '@nestjs/common';

import { Role } from '@/common/enums/role.enum';
import { Roles } from '@/common/decorators/roles.decorator';
import { HttpResponse } from '@/common/dto/http-response.dto';
import { AnalyticsService } from '@/analytics/services/analytics.service';
import { ApiResponseWithType } from '@/common/decorators/api-response.decorator';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly _analyticsService: AnalyticsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponseWithType()
  async get(): Promise<HttpResponse> {
    const data = await this._analyticsService.getDashboardAnalytics();

    return {
      success: true,
      message: 'Landing page data fetched successfully',
      data,
    };
  }
}
