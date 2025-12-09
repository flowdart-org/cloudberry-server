import { Module } from '@nestjs/common';

import { MediaModule } from '@/media/media.module';
import { ProductModule } from '@/product/product.module';
import { CategoryModule } from '@/product/category/category.module';
import { LandingPageService } from '@/landing-page/services/landing-page.service';
import { LandingPageController } from '@/landing-page/controllers/landing-page.controller';
import { PrismaLandingPageRepository } from '@/landing-page/repositories/prisma-landing-page.repository';

@Module({
  imports: [CategoryModule, ProductModule, MediaModule],
  controllers: [LandingPageController],
  providers: [
    LandingPageService,
    {
      provide: 'LandingPageRepository',
      useClass: PrismaLandingPageRepository,
    },
  ],
  exports: [LandingPageService],
})
export class LandingPageModule {}
