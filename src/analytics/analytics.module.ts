import { Module } from '@nestjs/common';

import { AnalyticsService } from '@/analytics/services/analytics.service';
import { AnalyticsController } from '@/analytics/controllers/analytics.controller';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
